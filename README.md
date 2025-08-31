# 📄 Document Summary Assistant

A web application that allows users to **upload documents** (PDF, DOCX, TXT, JPG/PNG images) and generate **AI-powered summaries** using Google Gemini models.

- **Frontend:** Next.js (React + TypeScript)  
- **Backend:** FastAPI with Tesseract OCR for image extraction  
- **Deployment:** Frontend on Vercel, Backend on Render  

---

## 🔹 Features

- Upload documents (PDF, DOCX, TXT) or images (JPG, PNG)  
- Extract text from uploaded files  
- Generate summaries in **short, medium, or long** length  
- Copy summaries to clipboard  
- Responsive drag & drop interface  

---

## 🛠️ Technologies Used

- **Frontend:** Next.js, React, TypeScript, Axios  
- **Backend:** FastAPI, Python, Tesseract OCR, docx2txt, pdfminer.six, Pillow, Google Gemini API  
- **Hosting:** Vercel (frontend), Render (backend)  

---

## 📥 Prerequisites

- Node.js ≥ 18  
- Python ≥ 3.10  
- pip  
- Tesseract OCR (for backend)  

---

## 🔹 Backend Setup (FastAPI)

1. **Clone the backend repository**
```bash
git clone <backend-repo-url>
cd backend
```
2. **Install dependencies**
   pip install -r requirements.txt

3. **Create .env file with your Gemini API key**
   GEMINI_API_KEY=your_gemini_api_key_here

4. **Run backend locally**
   uvicorn main:app --host 0.0.0.0 --port 8000

5. **Test the API**
   GET / → should return {"message":"Document Summary Assistant backend is running 🚀"}

   POST /upload/ → test document upload

   POST /summarize/ → test summarization

---

## 🔹 Frontend Setup (Next.js)

1. ****
2. ****
3. ****
4. ****

---

## 🔹 Deployment (Render + Vercel)

1. Push backend repo to GitHub
2. Create a Web Service on Render
3. Set build and start commands:
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port $PORT
4. Add environment variable:
   GEMINI_API_KEY=your_gemini_api_key_here
5. Deploy and verify your backend URL.
6. Import project into Vercel.
7. Add environment variable:
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
8. Deploy → Frontend will auto-redeploy on every push.


## 📬 Contact

For questions or contributions, open an issue or submit a pull request.
