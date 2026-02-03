
import { GoogleGenAI, Type } from "@google/genai";

interface StemDescription {
  name: string;
  description: string;
}

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function fetchStemDescriptions(fileName: string): Promise<StemDescription[]> {
  const prompt = `
    You are a professional audio engineer providing an analysis for an advanced stem separation tool.
    A user has uploaded an audio file named "${fileName}".
    Your task is to generate plausible descriptions for the separated audio stems.
    
    Provide a detailed, professional-sounding description for each of the following five stems:
    1. Vocals
    2. Drums
    3. Bass
    4. Instruments
    5. Other/Ambience

    Return your response ONLY as a valid JSON array of objects. Each object must have a "name" key and a "description" key.
    Do not include any other text, explanations, or markdown formatting like \`\`\`json.
    
    Example response format:
    [
      {"name": "Vocals", "description": "Lead vocal track, clear and upfront with a touch of hall reverb. Some faint backing harmonies are present in the chorus."},
      {"name": "Drums", "description": "Acoustic drum kit with a tight kick, snappy snare, and crisp hi-hats. The overheads capture a bright cymbal wash."},
      {"name": "Bass", "description": "Deep, round sub-bassline, likely from a synthesizer, providing a solid low-end foundation."},
      {"name": "Instruments", "description": "A mix of a rhythm electric guitar with light distortion and a main piano melody playing arpeggiated chords."},
      {"name": "Other/Ambience", "description": "Subtle atmospheric pads and a very light background noise floor, contributing to the track's space."}
    ]
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    let textResponse = response.text?.trim() || '';
    
    // Clean up potential markdown formatting
    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.substring(7);
    }
    if (textResponse.endsWith('```')) {
      textResponse = textResponse.slice(0, -3);
    }

    const parsedResponse: StemDescription[] = JSON.parse(textResponse);
    
    // Basic validation
    if (!Array.isArray(parsedResponse) || parsedResponse.length === 0 || !parsedResponse[0].name || !parsedResponse[0].description) {
      throw new Error("Invalid JSON structure received from API.");
    }
    
    return parsedResponse;

  } catch (error) {
    console.error("Error fetching or parsing stem descriptions:", error);
    throw new Error("Failed to get analysis from AI. The model may have returned an invalid format.");
  }
}
