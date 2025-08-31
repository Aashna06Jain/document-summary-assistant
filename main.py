from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os, tempfile
import docx2txt
from pdfminer.high_level import extract_text
import pytesseract
from PIL import Image
from dotenv import load_dotenv
from google import genai
import uvicorn  # Needed to run FastAPI on Render

load_dotenv()

# Initialize FastAPI
app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini client
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Please set it in .env")

client = genai.Client(api_key=api_key)
MODEL_ID = "gemini-2.5-flash"

# Text extractors
def extract_from_pdf(path): return extract_text(path)
def extract_from_docx(path): return docx2txt.process(path)
def extract_from_txt(path): 
    with open(path, "r", encoding="utf-8") as f: return f.read()
def extract_from_image(path): 
    return pytesseract.image_to_string(Image.open(path))

@app.get("/")
async def root():
    return {"message": "Document Summary Assistant backend is running 🚀"}

@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    if ext == "pdf":
        text = extract_from_pdf(tmp_path)
    elif ext in ["doc", "docx"]:
        text = extract_from_docx(tmp_path)
    elif ext == "txt":
        text = extract_from_txt(tmp_path)
    elif ext in ["png", "jpg", "jpeg"]:
        text = extract_from_image(tmp_path)
    else:
        return {"error": "Unsupported file format"}

    os.remove(tmp_path)
    return {"text": text[:4000]}  # limit to avoid token overflow

@app.post("/summarize/")
async def summarize(data: dict):
    text = data.get("text", "")
    length = data.get("length", "medium")

    if not text:
        return {"error": "No text provided"}

    if length == "short":
        prompt = f"Summarize this document briefly:\n{text}"
    elif length == "long":
        prompt = f"Provide a detailed long summary of this document:\n{text}"
    else:
        prompt = f"Summarize this document clearly:\n{text}"

    response = client.models.generate_content(
        model=MODEL_ID,
        contents=[{"parts": [{"text": prompt}]}]
    )
    return {"summary": response.text}

# --- Run on Render ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Use Render's PORT
    uvicorn.run(app, host="0.0.0.0", port=port)
