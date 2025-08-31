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

Made by Aashna Jain
git clone <backend-repo-url>
cd backend
