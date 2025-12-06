import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Challenge, SubjectArea, DifficultyLevel } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const challengeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "An epic title for the challenge." },
    narrative: { type: Type.STRING, description: "1-3 sentences setting a sci-fi/adventure context." },
    description: { type: Type.STRING, description: "Clear instruction of the core problem." },
    skills: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of cognitive skills involved (e.g., Divergent Thinking)."
    },
    levels: {
      type: Type.OBJECT,
      properties: {
        [DifficultyLevel.LEVEL_1]: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            question: { type: Type.STRING },
            hint: { type: Type.STRING }
          },
          required: ["title", "description", "question"]
        },
        [DifficultyLevel.LEVEL_2]: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            question: { type: Type.STRING },
            hint: { type: Type.STRING }
          },
          required: ["title", "description", "question"]
        },
        [DifficultyLevel.LEVEL_3]: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            question: { type: Type.STRING },
            hint: { type: Type.STRING }
          },
          required: ["title", "description", "question"]
        }
      },
      required: [DifficultyLevel.LEVEL_1, DifficultyLevel.LEVEL_2, DifficultyLevel.LEVEL_3]
    },
    extraChallenge: { type: Type.STRING, description: "A creative extension of the problem." },
    metacognitiveQuestions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3 questions to reflect on the thinking process." 
    },
    teacherNotes: { type: Type.STRING, description: "Pedagogical goals and indicators for teachers." }
  },
  required: ["title", "narrative", "description", "skills", "levels", "extraChallenge", "metacognitiveQuestions", "teacherNotes"]
};

export const generateChallenge = async (subject: SubjectArea): Promise<Challenge> => {
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `
    Actúa como un diseñador experto de experiencias educativas para alumnado de Altas Capacidades (AACC) en Educación Primaria.
    Tu objetivo es crear retos cognitivos NO repetitivos, basados en el enriquecimiento (vertical y horizontal) y pensamiento divergente.
    Usa un tono épico, de "Misión Neuronauta".
    
    Estructura del reto:
    1. Narrativa breve: Contexto de aventura/sci-fi.
    2. Niveles:
       - Nivel 1: Exploración. Accesible pero curioso.
       - Nivel 2: Enriquecimiento. Más profundidad.
       - Nivel 3: Reto profundo (HOTS). Abstracción, conexiones complejas.
    3. Habilidades: Etiquetas como "Lógica", "Creatividad", "Meta-cognición".
    4. Notas Docentes: Explica brevemente el objetivo pedagógico.
  `;

  const prompt = `Genera un reto educativo único para el área: ${subject}. 
  Asegúrate de que sea adecuado para niños de 8-12 años con altas capacidades. 
  Que sea desafiante, divertido y fomente la autonomía.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: challengeSchema,
        temperature: 0.8 // Higher creativity
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const data = JSON.parse(text);
    return {
      id: Date.now().toString(),
      subject,
      ...data
    } as Challenge;

  } catch (error) {
    console.error("Error generating challenge:", error);
    throw error;
  }
};
