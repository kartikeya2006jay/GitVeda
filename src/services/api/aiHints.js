const DEFAULT_AI_HINT_ENDPOINT = "/api/ai-hint";

function normalizeResponse(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid AI response payload.");
  }

  const hint = typeof payload.hint === "string" ? payload.hint.trim() : "";
  const explanation = typeof payload.explanation === "string" ? payload.explanation.trim() : "";

  if (!hint || !explanation) {
    throw new Error("AI response is missing hint or explanation.");
  }

  return { hint, explanation };
}

export async function getMissionHint({ mission, question, answer, command }) {
  const endpoint = import.meta.env.VITE_AI_HINT_API_URL || DEFAULT_AI_HINT_ENDPOINT;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mission,
      question,
      answer,
      command,
      instructions:
        "Return JSON with keys hint and explanation in English only. Keep it easy for students.",
    }),
  });

  if (!response.ok) {
    throw new Error(`AI hint request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeResponse(payload);
}
