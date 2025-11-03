// src/services/api.js
export async function analyzeResume(resumeText, jobDescription = "") {
  const res = await fetch("http://localhost:5000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, jobDescription }),
  });
  if (!res.ok) throw new Error("Failed to analyze resume");
  return await res.json();
}
