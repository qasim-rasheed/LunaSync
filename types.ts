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

// Updated to include lists of personalized recommendations
export interface DayPlan {
  date: string;
  phase: CyclePhase;
  summary: string;
  moodForecast: string;
  
  // Detailed single tip (existing)
  workoutRecommendation: string;
  nutritionTip: string;
  productivityHack: string;
  selfCareAction: string;

  // NEW: Personalized Lists for Planning
  recommendations: {
    work: string[];
    movement: string[];
    nutrition: string[];
    selfcare: string[];
  };

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

export interface PlanItem {
  id: string;
  text: string;
  category: 'work' | 'movement' | 'nutrition' | 'selfcare';
  phase: CyclePhase;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  items: PlanItem[];
}