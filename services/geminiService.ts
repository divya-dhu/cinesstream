
import { GoogleGenAI } from "@google/genai";

export const getMovieInsight = async (movieTitle: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short, exciting one-sentence summary for why a movie enthusiast should watch "${movieTitle}". Keep it engaging and cinematic.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This cinematic masterpiece is a must-watch for all movie lovers!";
  }
};
