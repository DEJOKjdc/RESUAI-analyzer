// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { analyzeResumeWithGemini } from "./geminiService.js";

// ✅ Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ ResuAI Server is running successfully!");
});

// ✅ Resume analysis route
app.post("/api/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Missing resume text." });
    }

    const result = await analyzeResumeWithGemini(resumeText, jobDescription);
    res.json(result);
  } catch (err) {
    console.error("❌ Analysis failed:", err);
    res.status(500).json({ error: "Server error while analyzing resume." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
