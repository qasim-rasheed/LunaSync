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
      
      CRITICAL: Generate personalized LISTS of small, actionable items (3-5 items per category) that the user can add to their calendar. 
      These items must be short (2-6 words max) and directly relevant to their profile (e.g., if they like Yoga, suggest specific poses; if they are Vegan, suggest vegan snacks).

      ADDITIONALLY:
      Look ahead at the next 3-5 days. Identify a key moment (e.g., entering a new phase, a high-energy day, or a need for rest).
      Create a "Wellness Calendar Event" suggestion for that day.
      - Title: Short, catchy, action-oriented (e.g., "Sunset Yoga & Journaling", "Big Project Focus Block", "Slow Down & Meditate").
      - Description: A short persuasive paragraph (2-3 sentences) on WHY this specific action will benefit her on that specific future day.
      - Days Offset: How many days from today this event should be scheduled (e.g. 2, 3, 4, or 5).

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
            moodForecast: { type: Type.STRING, description: "Emotional landscape to expect." },
            
            // Main Tips
            workoutRecommendation: { type: Type.STRING, description: "Specific workout advice based on energy levels." },
            nutritionTip: { type: Type.STRING, description: "Foods to eat to support hormones in this phase." },
            productivityHack: { type: Type.STRING, description: "How to work smart today based on brain chemistry." },
            selfCareAction: { type: Type.STRING, description: "A small act of kindness for oneself." },
            
            // NEW: Personalized Recommendations Lists
            recommendations: {
              type: Type.OBJECT,
              properties: {
                work: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "3-5 short work/study tasks tailored to user's job and phase."
                },
                movement: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "3-5 short exercises tailored to user's interests and phase."
                },
                nutrition: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "3-5 short food items/meals tailored to user's diet and phase."
                },
                selfcare: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "3-5 short self-care acts tailored to user's goals and phase."
                }
              },
              required: ["work", "movement", "nutrition", "selfcare"]
            },

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
          required: ["summary", "workoutRecommendation", "nutritionTip", "productivityHack", "selfCareAction", "moodForecast", "recommendations", "upcomingEvent"]
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