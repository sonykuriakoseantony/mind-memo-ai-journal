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
                 JSON object: {"mood": "sentiment", "confidence": 0.0}. 
                 Text: "${text}"`,
    });

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

      // Access mood
      const mood = parsed.mood;
      return mood;
    } else {
      console.log("No text response from Gemini");
    }
  } catch (error) {
    console.error("Analysis failed:", error);
  }
}
