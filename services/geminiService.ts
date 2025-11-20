import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CyclePhase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export const generateDailyAdvice = async (
  user: UserProfile,
  currentPhase: CyclePhase,
  dayOfCycle: number
) => {
  try {
    const prompt = `
      Act as a world-class holistic women's health expert specializing in infradian rhythms and cycle syncing.
      
      User Profile:
      - Name: ${user.name}
      - Interests: ${user.interests.join(", ")}
      - Dietary Preference: ${user.dietaryPreference}
      - Work/Life Schedule: ${user.workSchedule}
      - Energy Rhythm: ${user.sleepChronotype}
      - Common Cycle Challenges/Symptoms: ${user.commonSymptoms.length > 0 ? user.commonSymptoms.join(", ") : "None reported"}
      - Specific Goals: ${user.specificGoals}
      - Current Cycle Status: Day ${dayOfCycle} of ${user.cycleLength}-day cycle.
      - Current Phase: ${currentPhase}

      Generate a highly personalized daily plan for today.
      The tone should be supportive, expert, encouraging, and practical.
      
      ADDITIONALLY:
      Look ahead at the next 3-5 days. Identify a key moment (e.g., entering a new phase, a high-energy day, or a need for rest).
      Create a "Wellness Calendar Event" suggestion for that day.
      - Title: Short, catchy, action-oriented (e.g., "Sunset Yoga & Journaling", "Big Project Focus Block", "Slow Down & Meditate").
      - Description: A short persuasive paragraph (2-3 sentences) on WHY this specific action will benefit her on that specific future day.
      - Days Offset: How many days from today this event should be scheduled (e.g. 2, 3, 4, or 5).

      CRITICAL GUIDELINES:
      1. Use the User's SPECIFIC interests.
      2. Respect their DIET.
      3. Respect their SCHEDULE.
      4. Address SYMPTOMS.
      
      Output JSON only.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are Luna, a compassionate and knowledgeable cycle-syncing coach.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A 1-sentence greeting and summary of today's vibe." },
            workoutRecommendation: { type: Type.STRING, description: "Specific workout advice based on energy levels." },
            nutritionTip: { type: Type.STRING, description: "Foods to eat to support hormones in this phase." },
            productivityHack: { type: Type.STRING, description: "How to work smart today based on brain chemistry." },
            selfCareAction: { type: Type.STRING, description: "A small act of kindness for oneself." },
            moodForecast: { type: Type.STRING, description: "Emotional landscape to expect." },
            upcomingEvent: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Catchy title for a future calendar event." },
                description: { type: Type.STRING, description: "Short paragraph explaining the benefit." },
                daysOffset: { type: Type.NUMBER, description: "Number of days from today (integer)." }
              },
              required: ["title", "description", "daysOffset"]
            }
          },
          required: ["summary", "workoutRecommendation", "nutritionTip", "productivityHack", "selfCareAction", "moodForecast", "upcomingEvent"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};