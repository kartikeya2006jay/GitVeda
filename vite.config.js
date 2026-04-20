import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function parseHintResponse(payload) {
  const jsonText =
    payload?.output_text ||
    payload?.output?.[0]?.content?.find((item) => item?.type === "output_text")?.text ||
    payload?.output?.[0]?.content?.[0]?.text;

  if (!jsonText) {
    throw new Error("OpenAI response did not contain JSON text output.");
  }

  const parsed = JSON.parse(jsonText);
  if (!parsed?.hint || !parsed?.explanation) {
    throw new Error("OpenAI response JSON missing hint/explanation fields.");
  }

  return parsed;
}

function aiHintDevApi(env) {
  return {
    name: "ai-hint-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/ai-hint", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const apiKey = env.OPENAI_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "OPENAI_API_KEY is not configured." }));
          return;
        }

        try {
          const body = await new Promise((resolve, reject) => {
            let raw = "";
            req.on("data", (chunk) => {
              raw += chunk;
            });
            req.on("end", () => {
              try {
                resolve(JSON.parse(raw || "{}"));
              } catch (error) {
                reject(error);
              }
            });
            req.on("error", reject);
          });

          const { mission, question, answer, command } = body;
          if (!mission || !question || !answer || !command) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: "mission, question, answer, and command are required.",
              })
            );
            return;
          }

          const model = env.OPENAI_MODEL || "gpt-4.1-mini";
          const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              input: [
                {
                  role: "system",
                  content:
                    "You are a Git tutor for students. Respond with strict JSON: {\"hint\":\"...\",\"explanation\":\"...\"}. English only. Keep both concise and easy to understand.",
                },
                {
                  role: "user",
                  content: `Mission: ${mission}\nQuestion: ${question}\nCorrect command: ${answer}\nCommand reference: ${command}\nGive a short hint and a separate easy explanation in English.`,
                },
              ],
              text: {
                format: {
                  type: "json_schema",
                  name: "english_hint",
                  schema: {
                    type: "object",
                    properties: {
                      hint: { type: "string" },
                      explanation: { type: "string" },
                    },
                    required: ["hint", "explanation"],
                    additionalProperties: false,
                  },
                },
              },
            }),
          });

          if (!openAIResponse.ok) {
            const details = await openAIResponse.text();
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "OpenAI API call failed", details }));
            return;
          }

          const payload = await openAIResponse.json();
          const parsed = parseHintResponse(payload);

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(parsed));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Failed to generate AI hint", details: error.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), aiHintDevApi(env)],
    server: { port: 5173 },
  };
});
