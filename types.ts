export enum CyclePhase {
  MENSTRUAL = 'Menstrual',
  FOLLICULAR = 'Follicular',
  OVULATORY = 'Ovulatory',
  LUTEAL = 'Luteal',
}

export interface UserProfile {
  name: string;
  interests: string[];
  dietaryPreference: string;
  workSchedule: string;
  sleepChronotype: string;
  commonSymptoms: string[];
  specificGoals: string;
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLength: number;
}

export interface DayPlan {
  date: string;
  phase: CyclePhase;
  summary: string;
  workoutRecommendation: string;
  nutritionTip: string;
  productivityHack: string;
  selfCareAction: string;
  moodForecast: string;
  upcomingEvent: {
    title: string;
    description: string;
    daysOffset: number;
  };
}

export interface InterestOption {
  category: string;
  items: string[];
  icon: string;
}