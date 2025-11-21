import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { INTEREST_OPTIONS, DIETARY_OPTIONS, WORK_STYLE_OPTIONS, SLEEP_CHRONOTYPE_OPTIONS, SYMPTOM_OPTIONS } from '../constants';
import { Button } from '../components/Button';
import { ChevronRight, ChevronLeft, Check, Plus, X, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [showAbortModal, setShowAbortModal] = useState(false);

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

  const confirmAbort = () => {
    navigate('/');
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return name.trim().length > 0;
      case 2: return selectedInterests.length >= 3;
      case 3: return dietaryPreference !== '' && workSchedule !== '' && sleepChronotype !== '';
      case 4: return true; 
      case 5: return specificGoals.trim().length > 0;
      case 6: return lastPeriodDate !== '' && cycleLength > 20 && cycleLength < 45;
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mt-24 pb-12 min-h-[80vh] flex flex-col relative">
      
      {/* Abort Button - Now positioned relative to the pushed down container */}
      <div className="absolute -top-12 right-4 z-10">
        <button 
          onClick={() => setShowAbortModal(true)}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-red-500 shadow-sm border border-transparent hover:border-red-100 transition-all hover:scale-110"
          title="Exit Onboarding"
        >
          <X size={20} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showAbortModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700 transform scale-100 animate-float">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stop setup?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Your progress will be lost and you'll return to the home page.
              </p>
              <div className="flex gap-3 w-full pt-2">
                <button 
                  onClick={() => setShowAbortModal(false)}
                  className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Continue Setup
                </button>
                <button 
                  onClick={confirmAbort}
                  className="flex-1 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors"
                >
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-8">
        <div 
          className="bg-gradient-to-r from-pink-400 to-violet-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-10 shadow-xl border border-white/50 dark:border-gray-700 flex-grow flex flex-col relative overflow-hidden">
        
        {/* Background Decorative Gradient */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex-grow relative z-10">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Let's get started.</h2>
                 <p className="text-lg text-gray-500 dark:text-gray-400">First things first, what should we call you?</p>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full text-3xl bg-transparent border-b-2 border-gray-200 focus:border-pink-500 outline-none py-3 px-1 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors font-medium"
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
              
              <form onSubmit={addCustomInterest} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="Add something specific (e.g. Pottery)..."
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!customInterest.trim()}
                  className="p-3 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 disabled:opacity-50 transition-colors"
                >
                  <Plus size={24} />
                </button>
              </form>

              {selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-dashed border-gray-200 dark:border-gray-700">
                  {selectedInterests.map(item => (
                     <button 
                        key={item} 
                        onClick={() => toggleInterest(item)}
                        className="px-3 py-1.5 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
                     >
                       {item} <X size={14}/>
                     </button>
                  ))}
                </div>
              )}
              
              <div className="space-y-6 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                {INTEREST_OPTIONS.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span>{category.icon}</span> {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleInterest(item)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 
                            ${selectedInterests.includes(item) 
                              ? 'bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-500/30 transform scale-105' 
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/10'
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
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lifestyle Check</h2>
                <p className="text-gray-500 dark:text-gray-400">To tailor your nutrition and schedule.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Dietary Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setDietaryPreference(opt)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${dietaryPreference === opt ? 'bg-pink-100 border-pink-500 text-pink-700 dark:bg-pink-900/40 dark:text-pink-100 ring-1 ring-pink-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Work/Study Schedule</label>
                  <div className="flex flex-wrap gap-2">
                    {WORK_STYLE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setWorkSchedule(opt)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${workSchedule === opt ? 'bg-violet-100 border-violet-500 text-violet-700 dark:bg-violet-900/40 dark:text-violet-100 ring-1 ring-violet-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Natural Energy Rhythm</label>
                  <div className="flex flex-wrap gap-2">
                    {SLEEP_CHRONOTYPE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSleepChronotype(opt)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${sleepChronotype === opt ? 'bg-teal-100 border-teal-500 text-teal-700 dark:bg-teal-900/40 dark:text-teal-100 ring-1 ring-teal-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
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
                <p className="text-gray-500 dark:text-gray-400">Tell Luna what are you more common symptoms before and during your period</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-4 rounded-2xl border text-sm font-medium text-left transition-all flex flex-col justify-between gap-2 h-24
                      ${commonSymptoms.includes(symptom) 
                        ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200 shadow-sm' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span>{symptom}</span>
                    {commonSymptoms.includes(symptom) && <Check size={18} className="text-rose-500 self-end" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in h-full flex flex-col">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What's your focus?</h2>
                <p className="text-gray-500 dark:text-gray-400">What are your current goals?</p>
              </div>
              <textarea
                value={specificGoals}
                onChange={(e) => setSpecificGoals(e.target.value)}
                placeholder="e.g., Training for a marathon, Finishing my thesis, Reducing stress, Getting pregnant..."
                className="flex-grow w-full p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none resize-none text-lg transition-all"
              />
            </div>
          )}

          {/* Step 6: Cycle Data */}
          {step === 6 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cycle Details</h2>
                 <p className="text-gray-500 dark:text-gray-400">The final piece of the puzzle.</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Start date of your last period
                  </label>
                  <div 
                    className="relative cursor-pointer group" 
                    onClick={() => {
                      if(dateInputRef.current) {
                        try { dateInputRef.current.showPicker(); } catch (e) { dateInputRef.current.focus(); }
                      }
                    }}
                  >
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={lastPeriodDate}
                      onChange={(e) => setLastPeriodDate(e.target.value)}
                      className="w-full p-4 pl-4 pr-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer text-gray-900 dark:text-white font-medium"
                    />
                    <CalendarIcon 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pink-500 transition-colors" 
                      size={24} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                    Average Cycle Length
                  </label>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-gray-400 text-xs font-bold uppercase">Short (21)</span>
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{cycleLength} Days</span>
                      <span className="text-gray-400 text-xs font-bold uppercase">Long (40)</span>
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
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            disabled={step === 1}
            className={`transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft size={20} /> Back
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
            className="px-8 shadow-lg shadow-pink-500/20"
          >
            {step === totalSteps ? 'Finish Setup' : 'Continue'} <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};