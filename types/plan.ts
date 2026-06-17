export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  meal: string
  macros: Macros
  prepTime: string
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  notes: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
  warmup: string[]
  cooldown: string[]
}

export interface Recipe {
  name: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  prepTime: string
  calories: number
  macros: { protein: number; carbs: number; fat: number }
  ingredients: string[]
  instructions: string[]
  glowUpTip: string
}

export interface GlowUpPlan {
  userName: string
  generatedAt: string
  audit: {
    bmi: number
    bmiCategory: string
    bodyFatCategory: string
    maintenanceCalories: number
    targetCalories: number
    proteinTarget: string
    keyInsights: string[]
    priorityAreas: string[]
  }
  schedule: {
    dailyRoutine: Array<{ time: string; activity: string; duration: string; notes: string }>
    weeklyStructure: string[]
    morningRitual: string[]
    eveningRitual: string[]
  }
  products: {
    skincare: Array<{ name: string; purpose: string; howToUse: string; timing: string }>
    supplements: Array<{ name: string; dosage: string; timing: string; benefit: string }>
    tools: Array<{ name: string; use: string }>
  }
  skincare: {
    morningRoutine: Array<{ step: number; product: string; technique: string; duration: string }>
    eveningRoutine: Array<{ step: number; product: string; technique: string; duration: string }>
    weeklyTreatments: Array<{ treatment: string; frequency: string; benefit: string }>
    skinType: string
    keyIngredients: string[]
    avoid: string[]
  }
  bodyHair: {
    hairCareRoutine: Array<{ step: number; action: string; product: string; frequency: string }>
    bodyCare: Array<{ area: string; routine: string; frequency: string }>
    groomingSchedule: Array<{ task: string; frequency: string }>
    hairGrowthTips: string[]
  }
  faceGym: {
    exercises: Array<{ name: string; targetArea: string; reps: string; sets: number; technique: string }>
    dailyRoutineMins: number
    weeklySchedule: string
    tools: string[]
    benefits: string[]
  }
  food: {
    dailyMealPlan: {
      breakfast: Meal
      morningSnack: Meal
      lunch: Meal
      afternoonSnack: Meal
      dinner: Meal
    }
    hydration: string
    foodsToEat: string[]
    foodsToAvoid: string[]
    mealPrepTips: string[]
  }
  recipes: Recipe[]
  workout: {
    weeklyPlan: WorkoutDay[]
    progressionModel: string
    deloadProtocol: string
    keyLifts: string[]
  }
  calisthenics: {
    skillProgression: Array<{
      skill: string
      currentLevel: string
      progressionSteps: string[]
      timelineWeeks: number
    }>
    dailyMovement: Array<{ exercise: string; sets: number; reps: string; notes: string }>
    mobilityWork: string[]
    fundamentals: string[]
  }
  progress: {
    weeklyCheckIns: string[]
    monthlyMilestones: Array<{ month: number; targets: string[]; assessments: string[] }>
    photos: string[]
    metrics: Array<{ metric: string; baseline: string; target: string; trackingMethod: string }>
    mindsetCues: string[]
  }
}
