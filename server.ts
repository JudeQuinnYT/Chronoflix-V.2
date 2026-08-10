import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || !apiKey.trim()) {
        return res.json({
          text: `⚠️ **No API Key Configured**\n\nPlease add your \`GEMINI_API_KEY\` under the **Settings > Secrets** panel in the AI Studio UI to unlock the immersive AI Chronology Assistant!\n\nIn the meantime, feel free to use the built-in interactive timelines for **Marvel Cinematic**, **Fast & Furious**, **Star Wars**, and **Godzilla** where you can track your watch progress and read chronological briefs.`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are the "Chronos AI Assistant", an elite cinematic historian and timeline guide for Chronoflix. 
Your tone is authoritative, immersive, and cinematic, yet friendly, highly organized, and STRICTLY SPOILER-PROOF.

CRITICAL DIRECTIVES:
1. **STRICTLY SPOILER-PROOF**: NEVER reveal major plot twists, character deaths, surprise cameos, climax events, or end-credits secrets. Keep all movie descriptions at a high-level teaser level focused on setup, themes, tone, and production context.
2. **TRIVIA & LORE FOCUS**: Provide fascinating trivia, behind-the-scenes production facts, filming location details, casting history, easter eggs (without plot spoilers), and cinematic universe connections.
3. **FEATURED UNIVERSES**: Focus your expertise specifically on the cinematic universes currently featured in Chronoflix:
   - **Marvel Cinematic Universe (MCU)** (Phases 1-6)
   - **Fast & Furious** (Quarter-Mile / Family Heist Saga)
   - **Star Wars** (Galactic Saga)
   - **Godzilla / MonsterVerse** (Kaiju Multiverse & Showa/Heisei/Millennium Continua)
4. **WATCH ORDER GUIDANCE**: When asked for watch orders, provide clear "Release Order" or "In-Story Chronological Order" without spoiling plot progression.
5. **FORMATTING**: Structure your answers with clean headings, bullet points, and bold years or dates. Use elegant Markdown.`,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "Internal server error during generation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
