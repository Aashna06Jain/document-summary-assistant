"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("medium");
  const [showExtracted, setShowExtracted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  const backendURL = "https://document-summary-assistant-1-n59r.onrender.com"; 

  const handleFileChange = (f: File | null) => {
    if (f) setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.text) {
        setText(res.data.text);
        setShowExtracted(false);
        setError(null); 
      } else {
        setText(""); 
        setError("❌ Could not extract text from this file type. Please upload PDF, DOC, or TXT.");
      }
    } catch (err: any) {
      console.error(err);
      setError("❌ Upload failed. Please try again.");
    }
    setLoading(false);
  };

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/summarize/`, {
        text,
        length: summaryLength,
      });
      setSummary(res.data.summary);
      setError(null); 
    } catch (err) {
      console.error(err);
      setError("❌ Summarization failed. Please try again.");
    }
    setLoading(false);
  };

  const previewText = text && text.length > 300 ? text.slice(0, 300) + "..." : text || "";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📄 Document Summary Assistant</h1>

      {/* Drag & Drop Zone */}
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {file ? <p>{file.name}</p> : <p>Drag & drop a file here, or click to select</p>}
        <input
          id="fileInput"
          type="file"
          className={styles.fileInput}
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>

      <button onClick={handleUpload} className={styles.button}>
        Upload & Extract
      </button>

      {/* Dropdown for summary length */}
      <select
        value={summaryLength}
        onChange={(e) => setSummaryLength(e.target.value as "short" | "medium" | "long")}
        className={styles.dropdown}
      >
        <option value="short">Short Summary</option>
        <option value="medium">Medium Summary</option>
        <option value="long">Long Summary</option>
      </select>

      {loading && <p>Processing...</p>}

      {/* ✅ Inline Error Box */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Extracted Text Box */}
      {text && (
        <div className={styles.card}>
          <h2 className={styles.subtitle}>Extracted Text</h2>
          <p className={styles.text}>
            {showExtracted ? text : previewText}
          </p>
          {text.length > 300 && (
            <button
              onClick={() => setShowExtracted((prev) => !prev)}
              className={styles.button}
            >
              {showExtracted ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}

      {/* Generate Summary Button */}
      {text && (
        <button onClick={handleSummarize} className={styles.button}>
          Generate Summary
        </button>
      )}

      {/* Summary Box */}
      {summary && (
        <div className={`${styles.card} ${styles.cardSummary}`}>
          <h2 className={styles.subtitle}>Summary</h2>
          <p className={styles.text}>{summary}</p>
          <button
            onClick={() => navigator.clipboard.writeText(summary)}
            className={`${styles.button} ${styles.copyButton}`}
          >
            Copy Summary
          </button>
        </div>
      )}
    </div>
  );
}


