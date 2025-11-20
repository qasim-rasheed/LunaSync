import { InterestOption, CyclePhase } from './types';

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    category: "Wellness & Health",
    icon: "🧘‍♀️",
    items: ["Yoga", "Meditation", "Sleep Hygiene", "Nutrition", "Mental Health"]
  },
  {
    category: "Fitness",
    icon: "💪",
    items: ["Weight Lifting", "Running", "Pilates", "HIIT", "Walking"]
  },
  {
    category: "Career & Study",
    icon: "📚",
    items: ["Deep Work", "Learning Languages", "Coding", "Public Speaking", "Leadership"]
  },
  {
    category: "Creativity",
    icon: "🎨",
    items: ["Writing", "Painting", "Music", "Design", "Content Creation"]
  },
  {
    category: "Social & Lifestyle",
    icon: "🥂",
    items: ["Networking", "Relationships", "Travel", "Events", "Volunteering"]
  }
];

export const DIETARY_OPTIONS = [
  "Omnivore (Eat everything)", 
  "Vegetarian", 
  "Vegan", 
  "Pescatarian", 
  "Gluten-Free", 
  "Keto/Low Carb", 
  "Paleo"
];

export const WORK_STYLE_OPTIONS = [
  "9-5 Corporate", 
  "Student / Academic", 
  "Freelance / Flexible", 
  "Shift Work", 
  "Stay-at-home Parent"
];

export const SLEEP_CHRONOTYPE_OPTIONS = [
  "Early Bird (Morning Energy)", 
  "Night Owl (Evening Energy)", 
  "Variable / Irregular"
];

export const SYMPTOM_OPTIONS = [
  "Painful Cramps",
  "Mood Swings / PMS",
  "Fatigue / Low Energy",
  "Bloating",
  "Headaches / Migraines",
  "Acne / Skin Issues",
  "Insomnia",
  "Food Cravings",
  "Anxiety"
];

export const PHASE_COLORS = {
  [CyclePhase.MENSTRUAL]: "text-rose-500 border-rose-500 bg-rose-100 dark:bg-rose-900/30",
  [CyclePhase.FOLLICULAR]: "text-violet-500 border-violet-500 bg-violet-100 dark:bg-violet-900/30",
  [CyclePhase.OVULATORY]: "text-teal-500 border-teal-500 bg-teal-100 dark:bg-teal-900/30",
  [CyclePhase.LUTEAL]: "text-amber-500 border-amber-500 bg-amber-100 dark:bg-amber-900/30",
};

export const PHASE_DESCRIPTIONS = {
  [CyclePhase.MENSTRUAL]: "Rest & Reflect. Energy is lowest. Focus on intuition and evaluation.",
  [CyclePhase.FOLLICULAR]: "Dream & Create. Energy is rising. Great for brainstorming and new projects.",
  [CyclePhase.OVULATORY]: "Communicate & Connect. Peak energy. Best for social events and hard conversations.",
  [CyclePhase.LUTEAL]: "Focus & Finish. Energy winds down. Perfect for administrative tasks and wrapping up details.",
};