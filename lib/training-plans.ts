export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface Workout {
  name: string;
  exercises: Exercise[];
  restDays: string;
  warmup?: string;
  cooldown?: string;
}

export interface TrainingPlan {
  name: string;
  daysPerWeek: number;
  description: string;
  workouts: Record<string, Workout>;
}

export interface UserPreferences {
  trainingDays: number;
  goal: number;
  level: number;
  duration: number;
}

export const getDetailedTrainingPlan = (preferences: UserPreferences): TrainingPlan => {
  const { trainingDays, goal, level, duration } = preferences;
  
  if (trainingDays === 1) { // 2-3 Tage
    if (goal === 1) { // Muskelaufbau
      if (level === 1) { // Anfänger
        if (duration === 1) { // 30-60 Minuten
          return createFullBodyPlan(2, "Anfänger", "kurz");
        } else {
          return createFullBodyPlan(3, "Anfänger", "normal");
        }
      } else { // Fortgeschritten/Experte
        if (duration === 1) { // 30-60 Minuten
          return createSplitPlan(2, "Ober-/Unterkörper", "kurz");
        } else {
          return createSplitPlan(3, "Ober-/Unterkörper", "normal");
        }
      }
    } else if (goal === 2) { // Fettabbau
      return createHiitPlan(3, duration);
    } else { // Allgemeine Fitness
      return createFitnessPlan(3, duration);
    }
  } else if (trainingDays === 2) { // 3-4 Tage
    if (goal === 1) { // Muskelaufbau
      if (level === 1) { // Anfänger
        return createSplitPlan(3, "Ober-/Unterkörper", "normal");
      } else if (level === 2) { // Fortgeschritten
        if (duration === 1) { // 30-60 Minuten
          return createPplPlan(3, "kurz");
        } else {
          return createPplPlan(4, "normal");
        }
      } else { // Experte
        return createPplPlan(4, "normal");
      }
    } else if (goal === 2) { // Fettabbau
      return createHiitPlan(4, duration);
    } else { // Allgemeine Fitness
      return createFitnessPlan(4, duration);
    }
  } else if (trainingDays === 3) { // 5-6 Tage
    if (goal === 1) { // Muskelaufbau
      if (level === 3) { // Experte
        if (duration === 2) { // 1-2 Stunden
          return createArnoldSplit(5);
        } else {
          return createArnoldSplit(6);
        }
      } else if (level === 2) { // Fortgeschritten
        return createPplPlan(5, "normal");
      } else { // Anfänger
        return createSplitPlan(5, "Ober-/Unterkörper", "normal");
      }
    } else if (goal === 2) { // Fettabbau
      if (duration === 1) { // 30-60 Minuten
        return createHiitPlan(5, duration);
      } else {
        return createCardioStrengthPlan(5, duration);
      }
    } else { // Allgemeine Fitness
      return createFitnessPlan(5, duration);
    }
  }
  
  // Fallback
  return createFitnessPlan(3, 2);
};

const createFullBodyPlan = (days: number, level: string, duration: string): TrainingPlan => {
  const workoutExercises: Exercise[] = [
    { name: 'Kniebeugen', sets: 3, reps: '8-12' },
    { name: 'Liegestütze', sets: 3, reps: '8-15' },
    { name: 'Rudern', sets: 3, reps: '8-12' },
    { name: 'Schulterdrücken', sets: 3, reps: '8-12' },
    { name: 'Planks', sets: 3, reps: '30-60 Sek' },
    { name: 'Ausfallschritte', sets: 3, reps: '10-15 pro Bein' }
  ];
  
  const exercises = duration === "kurz" ? workoutExercises.slice(0, 4) : workoutExercises;
  
  const workouts: Record<string, Workout> = {};
  for (let day = 1; day <= days; day++) {
    workouts[`Tag ${day}`] = {
      name: `Ganzkörpertraining Tag ${day}`,
      exercises,
      restDays: '1-2 Tage Pause zwischen den Einheiten'
    };
  }
  
  return {
    name: `Ganzkörpertraining für ${level}`,
    daysPerWeek: days,
    description: `Ein ausgewogenes Ganzkörpertraining ${days} mal pro Woche`,
    workouts
  };
};

const createSplitPlan = (days: number, splitType: string, duration: string): TrainingPlan => {
  const upperBody: Exercise[] = [
    { name: 'Liegestütze', sets: 3, reps: '8-12' },
    { name: 'Schulterdrücken', sets: 3, reps: '8-12' },
    { name: 'Rudern', sets: 3, reps: '8-12' },
    { name: 'Trizeps-Dips', sets: 3, reps: '8-12' },
    { name: 'Bizeps-Curls', sets: 3, reps: '8-12' }
  ];
  
  const lowerBody: Exercise[] = [
    { name: 'Kniebeugen', sets: 3, reps: '8-12' },
    { name: 'Ausfallschritte', sets: 3, reps: '10-15 pro Bein' },
    { name: 'Kreuzheben', sets: 3, reps: '8-12' },
    { name: 'Wadenheben', sets: 3, reps: '15-20' },
    { name: 'Planks', sets: 3, reps: '30-60 Sek' }
  ];
  
  const upperExercises = duration === "kurz" ? upperBody.slice(0, 3) : upperBody;
  const lowerExercises = duration === "kurz" ? lowerBody.slice(0, 3) : lowerBody;
  
  const workouts: Record<string, Workout> = {};
  for (let day = 1; day <= days; day++) {
    if (day % 2 === 1) { // Ungerade Tage
      workouts[`Tag ${day}`] = {
        name: `Oberkörper Tag ${day}`,
        exercises: upperExercises,
        restDays: '1 Tag Pause'
      };
    } else { // Gerade Tage
      workouts[`Tag ${day}`] = {
        name: `Unterkörper Tag ${day}`,
        exercises: lowerExercises,
        restDays: '1 Tag Pause'
      };
    }
  }
  
  return {
    name: `${splitType}-Split`,
    daysPerWeek: days,
    description: `${splitType}-Training ${days} mal pro Woche`,
    workouts
  };
};

const createPplPlan = (days: number, duration: string): TrainingPlan => {
  const pushExercises: Exercise[] = [
    { name: 'Liegestütze', sets: 3, reps: '8-12' },
    { name: 'Schulterdrücken', sets: 3, reps: '8-12' },
    { name: 'Trizeps-Dips', sets: 3, reps: '8-12' },
    { name: 'Dips', sets: 3, reps: '8-12' }
  ];
  
  const pullExercises: Exercise[] = [
    { name: 'Klimmzüge', sets: 3, reps: '5-10' },
    { name: 'Rudern', sets: 3, reps: '8-12' },
    { name: 'Lat-Zug', sets: 3, reps: '8-12' },
    { name: 'Bizeps-Curls', sets: 3, reps: '8-12' }
  ];
  
  const legsExercises: Exercise[] = [
    { name: 'Kniebeugen', sets: 3, reps: '8-12' },
    { name: 'Ausfallschritte', sets: 3, reps: '10-15 pro Bein' },
    { name: 'Kreuzheben', sets: 3, reps: '8-12' },
    { name: 'Wadenheben', sets: 3, reps: '15-20' }
  ];
  
  const push = duration === "kurz" ? pushExercises.slice(0, 2) : pushExercises;
  const pull = duration === "kurz" ? pullExercises.slice(0, 2) : pullExercises;
  const legs = duration === "kurz" ? legsExercises.slice(0, 2) : legsExercises;
  
  const workoutTypes = ['Push', 'Pull', 'Legs'];
  const workouts: Record<string, Workout> = {};
  
  for (let day = 1; day <= days; day++) {
    const workoutType = workoutTypes[(day - 1) % 3];
    let exercisesList: Exercise[];
    
    if (workoutType === 'Push') {
      exercisesList = push;
    } else if (workoutType === 'Pull') {
      exercisesList = pull;
    } else {
      exercisesList = legs;
    }
    
    workouts[`Tag ${day}`] = {
      name: `${workoutType} Tag ${day}`,
      exercises: exercisesList,
      restDays: '1 Tag Pause nach jedem Zyklus'
    };
  }
  
  return {
    name: 'Push/Pull/Legs (PPL)',
    daysPerWeek: days,
    description: `PPL-Training ${days} mal pro Woche`,
    workouts
  };
};

const createHiitPlan = (days: number, duration: number): TrainingPlan => {
  const hiitExercises: Exercise[] = [
    { name: 'Burpees', sets: 4, reps: '30 Sek Arbeit / 30 Sek Pause' },
    { name: 'Mountain Climbers', sets: 4, reps: '30 Sek Arbeit / 30 Sek Pause' },
    { name: 'Jumping Jacks', sets: 4, reps: '30 Sek Arbeit / 30 Sek Pause' },
    { name: 'High Knees', sets: 4, reps: '30 Sek Arbeit / 30 Sek Pause' },
    { name: 'Plank Jacks', sets: 4, reps: '30 Sek Arbeit / 30 Sek Pause' }
  ];
  
  const exercises = duration === 1 ? hiitExercises.slice(0, 3) : hiitExercises;
  const workouts: Record<string, Workout> = {};
  
  for (let day = 1; day <= days; day++) {
    workouts[`Tag ${day}`] = {
      name: `HIIT Tag ${day}`,
      exercises,
      restDays: '1 Tag Pause zwischen HIIT-Einheiten',
      warmup: '5-10 Minuten leichtes Aufwärmen',
      cooldown: '5-10 Minuten Stretching'
    };
  }
  
  return {
    name: 'HIIT-Training',
    daysPerWeek: days,
    description: `High-Intensity Interval Training ${days} mal pro Woche`,
    workouts
  };
};

const createFitnessPlan = (days: number, duration: number): TrainingPlan => {
  const fitnessExercises: Exercise[] = [
    { name: 'Kniebeugen', sets: 3, reps: '10-15' },
    { name: 'Liegestütze', sets: 3, reps: '8-12' },
    { name: 'Planks', sets: 3, reps: '30-60 Sek' },
    { name: 'Ausfallschritte', sets: 3, reps: '10 pro Bein' },
    { name: 'Mountain Climbers', sets: 3, reps: '20-30' },
    { name: 'Jumping Jacks', sets: 3, reps: '30 Sek' }
  ];
  
  const exercises = duration === 1 ? fitnessExercises.slice(0, 4) : fitnessExercises;
  const workouts: Record<string, Workout> = {};
  
  for (let day = 1; day <= days; day++) {
    workouts[`Tag ${day}`] = {
      name: `Fitness Tag ${day}`,
      exercises,
      restDays: '1-2 Tage Pause',
      warmup: '5-10 Minuten Aufwärmen',
      cooldown: '5-10 Minuten Stretching'
    };
  }
  
  return {
    name: 'Allgemeines Fitnessprogramm',
    daysPerWeek: days,
    description: `Ausgewogenes Training ${days} mal pro Woche`,
    workouts
  };
};

const createArnoldSplit = (days: number): TrainingPlan => {
  const chestBack: Exercise[] = [
    { name: 'Liegestütze', sets: 4, reps: '8-12' },
    { name: 'Klimmzüge', sets: 4, reps: '6-10' },
    { name: 'Dips', sets: 4, reps: '8-12' },
    { name: 'Rudern', sets: 4, reps: '8-12' },
    { name: 'Schulterdrücken', sets: 3, reps: '8-12' }
  ];
  
  const shouldersArms: Exercise[] = [
    { name: 'Schulterdrücken', sets: 4, reps: '8-12' },
    { name: 'Trizeps-Dips', sets: 4, reps: '8-12' },
    { name: 'Bizeps-Curls', sets: 4, reps: '8-12' },
    { name: 'Seitheben', sets: 3, reps: '10-15' },
    { name: 'Hammer Curls', sets: 3, reps: '8-12' }
  ];
  
  const legs: Exercise[] = [
    { name: 'Kniebeugen', sets: 4, reps: '8-12' },
    { name: 'Kreuzheben', sets: 4, reps: '6-10' },
    { name: 'Ausfallschritte', sets: 3, reps: '10-15 pro Bein' },
    { name: 'Wadenheben', sets: 4, reps: '15-20' },
    { name: 'Beinpresse', sets: 3, reps: '10-15' }
  ];
  
  const workoutTypes = ['Chest/Back', 'Shoulders/Arms', 'Legs'];
  const workouts: Record<string, Workout> = {};
  
  for (let day = 1; day <= days; day++) {
    const workoutType = workoutTypes[(day - 1) % 3];
    let exercisesList: Exercise[];
    
    if (workoutType === 'Chest/Back') {
      exercisesList = chestBack;
    } else if (workoutType === 'Shoulders/Arms') {
      exercisesList = shouldersArms;
    } else {
      exercisesList = legs;
    }
    
    workouts[`Tag ${day}`] = {
      name: `${workoutType} Tag ${day}`,
      exercises: exercisesList,
      restDays: '1 Tag Pause nach jedem Zyklus'
    };
  }
  
  return {
    name: 'Arnold Split',
    daysPerWeek: days,
    description: `Intensiver Split für Experten ${days} mal pro Woche`,
    workouts
  };
};

const createCardioStrengthPlan = (days: number, duration: number): TrainingPlan => {
  const workouts: Record<string, Workout> = {};
  
  for (let day = 1; day <= days; day++) {
    if (day % 2 === 1) { // Ungerade Tage - Kraft
      workouts[`Tag ${day}`] = {
        name: `Krafttraining Tag ${day}`,
        exercises: [
          { name: 'Kniebeugen', sets: 3, reps: '8-12' },
          { name: 'Liegestütze', sets: 3, reps: '8-12' },
          { name: 'Rudern', sets: 3, reps: '8-12' },
          { name: 'Planks', sets: 3, reps: '30-60 Sek' }
        ],
        restDays: '1 Tag Pause'
      };
    } else { // Gerade Tage - Cardio
      workouts[`Tag ${day}`] = {
        name: `Cardio Tag ${day}`,
        exercises: [
          { name: 'Joggen', sets: 1, reps: '20-30 Minuten' },
          { name: 'Burpees', sets: 3, reps: '30 Sek' },
          { name: 'Jumping Jacks', sets: 3, reps: '30 Sek' },
          { name: 'Mountain Climbers', sets: 3, reps: '30 Sek' }
        ],
        restDays: '1 Tag Pause'
      };
    }
  }
  
  return {
    name: 'Cardio-Kraft-Kombination',
    daysPerWeek: days,
    description: `Kombination aus Cardio und Krafttraining ${days} mal pro Woche`,
    workouts
  };
};

export const getPlanExplanation = (plan: TrainingPlan): string[] => {
  const planName = plan.name.toLowerCase();
  
  if (planName.includes('ganzkörpertraining')) {
    return [
      '🏋️ Ein Ganzkörpertraining ist ideal für Anfänger und bietet eine gleichmäßige Stärkung des gesamten Körpers.',
      '   • Erfordert weniger Zeit pro Woche',
      '   • Fördert eine ausgeglichene Entwicklung',
      '   • Perfekt für den Einstieg ins Krafttraining'
    ];
  } else if (planName.includes('push/pull/legs') || planName.includes('ppl')) {
    return [
      '💪 Push/Pull/Legs (PPL) ist ein Split-Programm, das Muskelgruppen nach Bewegungsmustern trennt.',
      '   • Effizient für Fortgeschrittene',
      '   • Gute Balance zwischen Intensität und Erholung',
      '   • Push: Brust, Schultern, Trizeps',
      '   • Pull: Rücken, Bizeps',
      '   • Legs: Beine, Gesäß'
    ];
  } else if (planName.includes('arnold split')) {
    return [
      '🔥 Der Arnold Split teilt das Training auf einzelne Muskelgruppen auf.',
      '   • Für erfahrene Athleten geeignet',
      '   • Erfordert viel Zeit pro Woche',
      '   • Maximale Intensität pro Muskelgruppe'
    ];
  } else if (planName.includes('hiit')) {
    return [
      '⚡ HIIT (High-Intensity Interval Training) kombiniert kurze, intensive Übungen mit Erholungsphasen.',
      '   • Effektiv für Fettabbau',
      '   • Verbessert die Kondition',
      '   • Zeitlich effizient'
    ];
  } else if (planName.includes('cardio')) {
    return [
      '🏃‍♂️ Cardio-Kraft-Kombination verbindet Ausdauer- und Krafttraining.',
      '   • Ausgewogener Ansatz',
      '   • Verbessert sowohl Kraft als auch Ausdauer',
      '   • Ideal für allgemeine Fitness'
    ];
  } else {
    return [
      '🌟 Ein allgemeines Fitnessprogramm fokussiert sich auf ein ganzheitliches Training.',
      '   • Fördert Kraft, Ausdauer und Beweglichkeit',
      '   • Ausgewogener Ansatz',
      '   • Geeignet für alle Fitnesslevel'
    ];
  }
};
