import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY; 

app.post("/ask", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: req.body.question }]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received";
    res.json({ answer });
  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).json({ error: "Error occurred" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
