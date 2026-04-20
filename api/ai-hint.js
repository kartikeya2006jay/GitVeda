export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured on server." });
  }

  const { mission, question, answer, command } = req.body || {};

  if (!mission || !question || !answer || !command) {
    return res.status(400).json({ error: "mission, question, answer, and command are required." });
  }

  try {
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

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
      const errorText = await openAIResponse.text();
      return res.status(502).json({ error: "OpenAI API call failed", details: errorText });
    }

    const payload = await openAIResponse.json();
    const outputText =
      payload?.output_text ||
      payload?.output?.[0]?.content?.find((item) => item?.type === "output_text")?.text ||
      payload?.output?.[0]?.content?.[0]?.text;

    if (!outputText) {
      return res.status(502).json({ error: "OpenAI response did not contain JSON text output." });
    }

    const parsed = JSON.parse(outputText);
    if (!parsed?.hint || !parsed?.explanation) {
      return res.status(502).json({ error: "OpenAI response JSON missing hint/explanation fields." });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate AI hint", details: error.message });
  }
}
