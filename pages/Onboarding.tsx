import React, { useState, useRef } from 'react';
import { UserProfile, InterestOption } from '../types';
import { INTEREST_OPTIONS, DIETARY_OPTIONS, WORK_STYLE_OPTIONS, SLEEP_CHRONOTYPE_OPTIONS, SYMPTOM_OPTIONS } from '../constants';
import { Button } from '../components/Button';
import { ChevronRight, ChevronLeft, Check, Plus, X, Calendar as CalendarIcon } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState('');
  
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [sleepChronotype, setSleepChronotype] = useState('');
  
  const [commonSymptoms, setCommonSymptoms] = useState<string[]>([]);
  
  const [specificGoals, setSpecificGoals] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);

  const dateInputRef = useRef<HTMLInputElement>(null);

  // Helpers
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const addCustomInterest = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const toggleSymptom = (symptom: string) => {
    setCommonSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      onComplete({
        name,
        interests: selectedInterests,
        dietaryPreference,
        workSchedule,
        sleepChronotype,
        commonSymptoms,
        specificGoals,
        lastPeriodDate,
        cycleLength
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return name.trim().length > 0;
      case 2: return selectedInterests.length >= 3;
      case 3: return dietaryPreference !== '' && workSchedule !== '' && sleepChronotype !== '';
      case 4: return true; // Symptoms can be empty
      case 5: return specificGoals.trim().length > 0;
      case 6: return lastPeriodDate !== '' && cycleLength > 20 && cycleLength < 45;
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-8">
        <div 
          className="bg-gradient-to-r from-pink-400 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 dark:border-gray-700 flex-grow flex flex-col">
        
        <div className="flex-grow">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hi there! 👋<br/>What should we call you?</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full text-2xl bg-transparent border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 px-1 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-colors"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What brings you joy?</h2>
                <p className="text-gray-500 dark:text-gray-400">Select at least 3 interests or add your own.</p>
              </div>
              
              {/* Custom Interest Input */}
              <form onSubmit={addCustomInterest} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="Add something specific (e.g. Astrophysics, Pottery)..."
                  className="flex-1 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!customInterest.trim()}
                  className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 disabled:opacity-50"
                >
                  <Plus size={24} />
                </button>
              </form>

              {/* Selected List (if custom added) */}
              {selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedInterests.map(item => (
                     <span key={item} className="px-3 py-1 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm flex items-center gap-1">
                       {item} <button onClick={() => toggleInterest(item)}><X size={14}/></button>
                     </span>
                  ))}
                </div>
              )}
              
              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {INTEREST_OPTIONS.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <span>{category.icon}</span> {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {category.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleInterest(item)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-2
                            ${selectedInterests.includes(item) 
                              ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white opacity-50 cursor-default' 
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500'
                            }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lifestyle Check</h2>
                <p className="text-gray-500 dark:text-gray-400">To tailor your nutrition and schedule.</p>
              </div>

              <div className="space-y-5">
                {/* Diet */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Dietary Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setDietaryPreference(opt)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${dietaryPreference === opt ? 'bg-pink-100 border-pink-500 text-pink-800 dark:bg-pink-900 dark:text-pink-100' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Work/Study Schedule</label>
                  <div className="flex flex-wrap gap-2">
                    {WORK_STYLE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setWorkSchedule(opt)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${workSchedule === opt ? 'bg-violet-100 border-violet-500 text-violet-800 dark:bg-violet-900 dark:text-violet-100' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Natural Energy Rhythm</label>
                  <div className="flex flex-wrap gap-2">
                    {SLEEP_CHRONOTYPE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSleepChronotype(opt)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${sleepChronotype === opt ? 'bg-teal-100 border-teal-500 text-teal-800 dark:bg-teal-900 dark:text-teal-100' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Symptoms */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Body Intelligence</h2>
                <p className="text-gray-500 dark:text-gray-400">Do you frequently experience any of these? (Select all that apply)</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-4 rounded-2xl border text-sm font-medium text-left transition-all flex items-start justify-between
                      ${commonSymptoms.includes(symptom) 
                        ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span>{symptom}</span>
                    {commonSymptoms.includes(symptom) && <Check size={16} className="mt-0.5" />}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 italic mt-4">This helps Luna anticipate your needs during difficult phases.</p>
            </div>
          )}

          {/* Step 5: Specific Goals (Previous Step 3) */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What's your main focus right now?</h2>
              <textarea
                value={specificGoals}
                onChange={(e) => setSpecificGoals(e.target.value)}
                placeholder="e.g., Training for a marathon, Finishing my thesis, Reducing stress, Getting pregnant..."
                className="w-full h-40 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none resize-none text-lg"
              />
            </div>
          )}

          {/* Step 6: Cycle Data (Previous Step 4) */}
          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cycle Details</h2>
              <p className="text-gray-500 dark:text-gray-400">This calculates your current phase.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    When did your last period start?
                  </label>
                  <div 
                    className="relative cursor-pointer group" 
                    onClick={() => {
                      if(dateInputRef.current) {
                        // Try to open the picker programmatically
                        try {
                          dateInputRef.current.showPicker();
                        } catch (e) {
                          dateInputRef.current.focus();
                        }
                      }
                    }}
                  >
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={lastPeriodDate}
                      onChange={(e) => setLastPeriodDate(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer text-gray-800 dark:text-gray-100"
                    />
                    <CalendarIcon 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pink-500 transition-colors" 
                      size={24} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Average Cycle Length (Days)
                  </label>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm">Short (21)</span>
                      <span className="text-2xl font-bold text-pink-600">{cycleLength} Days</span>
                      <span className="text-gray-500 text-sm">Long (40)</span>
                    </div>
                    <input
                      type="range"
                      min="21"
                      max="40"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            <ChevronLeft size={20} /> Back
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
          >
            {step === totalSteps ? 'Finish' : 'Next'} <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};