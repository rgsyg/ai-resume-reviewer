"use client";

import { useState } from "react";

interface Feedback {
  matchScore: number;
  atsScanScore: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  keywordsFound: string[];
  summary: string;
  atsWarnings?: string[];
}

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setFeedback(data.feedback);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function ScoreRing({ score, label }: { score: number; label: string }) {
    const radius = 36;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;
    const color =
      score >= 70 ? "#4ade80" : score >= 45 ? "#facc15" : "#f87171";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ position: "relative", width: 96, height: 96 }}>
          <svg width={96} height={96} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={48} cy={48} r={radius} fill="none" stroke="#1e293b" strokeWidth={7} />
            <circle
              cx={48} cy={48} r={radius} fill="none"
              stroke={color} strokeWidth={7}
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", lineHeight: 1 }}>{score}</span>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      </div>
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#020817",
      color: "#f1f5f9",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "0 0 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #1e40af44; }
        textarea {
          width: 100%; background: #0f172a; color: #e2e8f0;
          border: 1px solid #1e293b; border-radius: 10px;
          padding: 14px 16px; font-size: 14px; font-family: inherit;
          resize: vertical; outline: none; transition: border-color 0.2s;
          line-height: 1.6;
        }
        textarea:focus { border-color: #3b82f6; }
        textarea::placeholder { color: #334155; }
        .analyze-btn {
          background: #1d4ed8; color: #fff; border: none;
          padding: 14px 36px; border-radius: 10px; font-size: 15px;
          font-weight: 500; cursor: pointer; font-family: inherit;
          transition: background 0.2s, transform 0.1s;
          display: flex; align-items: center; gap: 8px;
        }
        .analyze-btn:hover:not(:disabled) { background: #2563eb; }
        .analyze-btn:active:not(:disabled) { transform: scale(0.98); }
        .analyze-btn:disabled { background: #1e3a6e; color: #475569; cursor: not-allowed; }
        .tag {
          display: inline-block; padding: 4px 10px; border-radius: 6px;
          font-size: 12px; font-weight: 500; font-family: 'DM Mono', monospace;
        }
        .tag-found { background: #052e16; color: #4ade80; border: 1px solid #166534; }
        .tag-missing { background: #2d0a0a; color: #f87171; border: 1px solid #7f1d1d; }
        .card {
          background: #0f172a; border: 1px solid #1e293b;
          border-radius: 12px; padding: 20px 24px;
        }
        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #475569; margin-bottom: 14px;
        }
        .list-item {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 8px 0; border-bottom: 1px solid #0f1f33; font-size: 14px;
          line-height: 1.55; color: #cbd5e1;
        }
        .list-item:last-child { border-bottom: none; }
        .dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        .warning-item {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 8px 12px; background: #1c1005; border: 1px solid #78350f;
          border-radius: 8px; font-size: 13px; color: #fbbf24; margin-bottom: 6px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .results-wrap { animation: fadeUp 0.4s ease; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px; border: 2px solid #ffffff33;
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid #0f172a",
        padding: "20px 0",
        background: "#020817",
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: "#1d4ed8", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", color: "#f1f5f9" }}>
            Resu<span style={{ color: "#3b82f6" }}>AI</span>
          </span>
          <span style={{
            marginLeft: "auto", fontSize: 11, color: "#334155",
            background: "#0f172a", border: "1px solid #1e293b",
            padding: "3px 8px", borderRadius: 5, fontFamily: "DM Mono, monospace",
          }}>beta</span>
        </div>
      </header>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>

        {/* Hero */}
        <div style={{ padding: "52px 0 40px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#3b82f6", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>
            ATS Resume Analyzer
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", color: "#f8fafc", lineHeight: 1.2, marginBottom: 14 }}>
            Know exactly how your<br />resume performs
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>
            Paste your resume and a job description to get an instant ATS score, keyword gaps, and actionable feedback.
          </p>
        </div>

        {/* Input form */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 500, letterSpacing: "0.04em" }}>
              RESUME
            </label>
            <textarea
              rows={12}
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 500, letterSpacing: "0.04em" }}>
              JOB DESCRIPTION
            </label>
            <textarea
              rows={12}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 48 }}>
          <button className="analyze-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? <><div className="spinner" /> Analyzing...</> : <>Analyze Resume →</>}
          </button>
        </div>

        {/* Results */}
        {feedback && (
          <div className="results-wrap">

            {/* Scores */}
            <div className="card" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 32 }}>
                <ScoreRing score={feedback.matchScore} label="Match" />
                <ScoreRing score={feedback.atsScanScore} label="ATS Score" />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{feedback.summary}</p>
              </div>
            </div>

            {/* Strengths + Improvements */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div className="card">
                <p className="section-label">Strengths</p>
                {feedback.strengths.map((s, i) => (
                  <div key={i} className="list-item">
                    <div className="dot" style={{ background: "#4ade80" }} />
                    {s}
                  </div>
                ))}
              </div>
              <div className="card">
                <p className="section-label">Improvements</p>
                {feedback.improvements.map((s, i) => (
                  <div key={i} className="list-item">
                    <div className="dot" style={{ background: "#f87171" }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="card" style={{ marginBottom: 16 }}>
              <p className="section-label">Keywords Found</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {feedback.keywordsFound.length > 0
                  ? feedback.keywordsFound.map((k, i) => <span key={i} className="tag tag-found">{k}</span>)
                  : <span style={{ fontSize: 13, color: "#475569" }}>None detected</span>}
              </div>
            </div>

            <div className="card" style={{ marginBottom: 16 }}>
              <p className="section-label">Missing Keywords</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {feedback.missingKeywords.length > 0
                  ? feedback.missingKeywords.map((k, i) => <span key={i} className="tag tag-missing">{k}</span>)
                  : <span style={{ fontSize: 13, color: "#475569" }}>None — great coverage!</span>}
              </div>
            </div>

            {/* ATS Warnings */}
            {feedback.atsWarnings && feedback.atsWarnings.length > 0 && (
              <div className="card">
                <p className="section-label">ATS Warnings</p>
                {feedback.atsWarnings.map((w, i) => (
                  <div key={i} className="warning-item">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ marginTop: 1, flexShrink: 0 }}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    {w}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}