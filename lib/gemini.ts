import { GoogleGenAI } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai"

// 1. Initialize with your API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function analyzeMood(text: string) {
  try {
    // 2. Use the models submodule to generate content
    // 'gemini-2.0-flash-exp' or 'gemini-1.5-flash' are common choices
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analyze the mood of this text and respond with ONLY a single 
                 JSON object: {"mood": "sentiment", "emoji": "😊"}. 
                 Text: "${text}"`,
    });

    console.log("Response from Gemini:", response.text);

    // 3. Access the result directly from the text property
    if (response.text) {
      const raw = response.text; // get model output

      // Remove markdown code fences
      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // Parse JSON
      const parsed = JSON.parse(cleaned);

      console.log("------------------Parsed Mood object : ", parsed);

      // Access mood
      const mood = parsed;
      return mood;
    } else {
      console.log("No text response from Gemini");
    }
  } catch (error) {
    console.error("Analysis failed:", error);
  }
}

export async function summarizeEntry(text: string) {
  try {
    // 2. Use the models submodule to generate content
    // 'gemini-2.0-flash-exp' or 'gemini-1.5-flash' are common choices
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize this journal into exactly 3 bullet points. 
                 Text: "${text}"`,
    });

    // 3. Access the result directly from the text property
    if (response.text) {
      const raw = response.text;

      // Remove markdown bullet points if present
      const cleaned = raw
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^(\*|-|\d+\.)\s/.test(line))
        .map((line) =>
          line
            .replace(/^(\*|-|\d+\.)\s*/, "")
            .replace(/\*\*/g, "")
            .trim(),
        );

      // Access summary
      const summary = cleaned;
      return summary;
    } else {
      console.log("No text response from Gemini");
    }
  } catch (error) {
    console.error("Summary generation failed:", error);
  }
}
