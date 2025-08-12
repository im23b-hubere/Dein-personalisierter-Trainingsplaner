'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Calendar, 
  ArrowRight, 
  RefreshCw,
  CheckCircle,
  Info,
  Trophy,
  Heart,
  Zap,
  Users
} from 'lucide-react';
import { getDetailedTrainingPlan, getPlanExplanation, type TrainingPlan, type UserPreferences } from '../lib/training-plans';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    trainingDays: 0,
    goal: 0,
    level: 0,
    duration: 0
  });
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = [
    {
      id: 'trainingDays',
      title: 'Wie oft pro Woche möchtest du trainieren?',
      icon: Calendar,
      options: [
        { value: 1, label: '2-3 Tage', description: 'Perfekt für Anfänger' },
        { value: 2, label: '3-4 Tage', description: 'Ausgewogen und effektiv' },
        { value: 3, label: '5-6 Tage', description: 'Für ambitionierte Athleten' }
      ]
    },
    {
      id: 'goal',
      title: 'Was ist dein Hauptziel?',
      icon: Target,
      options: [
        { value: 1, label: 'Muskelaufbau', description: 'Kraft und Masse aufbauen' },
        { value: 2, label: 'Fettabbau', description: 'Gewicht reduzieren' },
        { value: 3, label: 'Allgemeine Fitness', description: 'Gesundheit und Wohlbefinden' }
      ]
    },
    {
      id: 'level',
      title: 'Als was würdest du dich identifizieren?',
      icon: Users,
      options: [
        { value: 1, label: 'Anfänger', description: 'Erste Schritte im Training' },
        { value: 2, label: 'Fortgeschritten', description: 'Bereits Erfahrung gesammelt' },
        { value: 3, label: 'Experte', description: 'Langjährige Trainingserfahrung' }
      ]
    },
    {
      id: 'duration',
      title: 'Wie viel Zeit kannst du pro Trainingseinheit aufwenden?',
      icon: Clock,
      options: [
        { value: 1, label: '30-60 Minuten', description: 'Kompakte, effiziente Einheiten' },
        { value: 2, label: '1-2 Stunden', description: 'Ausführliches Training' },
        { value: 3, label: '> 2 Stunden', description: 'Intensive, lange Sessions' }
      ]
    }
  ];

  const handleOptionSelect = (questionId: keyof UserPreferences, value: number) => {
    setPreferences(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generatePlan();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generatePlan = () => {
    setIsGenerating(true);
    // Simulate loading
    setTimeout(() => {
      const generatedPlan = getDetailedTrainingPlan(preferences);
      setPlan(generatedPlan);
      setIsGenerating(false);
    }, 1500);
  };

  const resetPlan = () => {
    setCurrentStep(0);
    setPreferences({
      trainingDays: 0,
      goal: 0,
      level: 0,
      duration: 0
    });
    setPlan(null);
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = preferences[currentQuestion.id as keyof UserPreferences] > 0;

  if (plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gradient mb-4">
              🎉 Dein personalisierter Trainingsplan
            </h1>
            <p className="text-gray-600 text-lg">
              Erstellt von Eric Huber
            </p>
          </motion.div>

          {/* Plan Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">{plan.daysPerWeek}</div>
                <div className="text-sm text-gray-500">Tage/Woche</div>
              </div>
            </div>

            {/* Plan Explanation */}
            <div className="bg-primary-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-primary-800 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Über deinen Plan
              </h3>
              <div className="space-y-1">
                {getPlanExplanation(plan).map((line, index) => (
                  <p key={index} className="text-sm text-primary-700">{line}</p>
                ))}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Wöchentlicher Trainingsplan
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(plan.workouts).map(([day, workout], index) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-800 mb-3">{workout.name}</h4>
                    
                    {workout.warmup && (
                      <div className="text-sm text-gray-600 mb-2">
                        🔥 {workout.warmup}
                      </div>
                    )}

                    <div className="space-y-2 mb-3">
                      {workout.exercises.map((exercise, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium text-gray-700">{exercise.name}</span>
                          <span className="text-gray-500 ml-2">
                            {exercise.sets} Sätze à {exercise.reps}
                          </span>
                        </div>
                      ))}
                    </div>

                    {workout.cooldown && (
                      <div className="text-sm text-gray-600 mb-2">
                        🧘 {workout.cooldown}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      ⏸️ {workout.restDays}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Success Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              Tipps für Erfolg
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Führe jede Übung mit korrekter Technik aus</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Steigere die Gewichte/Intensität langsam</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Höre auf deinen Körper und gönne dir Pause</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Bleibe konsistent - Regelmäßigkeit ist der Schlüssel</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Ernähre dich ausgewogen und trinke genug Wasser</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={resetPlan}
              className="btn-secondary flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Neuen Plan erstellen
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <Dumbbell className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Dein personalisierter Trainingsplaner
          </h1>
          <p className="text-gray-600 text-lg">
            Erstelle deinen individuellen Trainingsplan basierend auf deinen Zielen und deinem Fitnesslevel
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Entwickelt von Eric Huber
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mb-8"
        >
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Schritt {currentStep + 1} von {questions.length}
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <currentQuestion.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.title}</h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionSelect(currentQuestion.id as keyof UserPreferences, option.value)}
                  className={`option-card w-full text-left ${
                    preferences[currentQuestion.id as keyof UserPreferences] === option.value ? 'selected' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-semibold text-gray-800 mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Zurück
              </button>
              
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                    </motion.div>
                    Erstelle Plan...
                  </>
                ) : (
                  <>
                    {isLastStep ? 'Plan erstellen' : 'Weiter'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
