import React from 'react';
import { ArrowRight, Calendar, Sparkles, Activity } from 'lucide-react';
import { Button } from '../components/Button';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <div className="max-w-3xl space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-sm font-semibold tracking-wide uppercase">
          <Sparkles size={14} />
          <span>AI-Powered Cycle Syncing</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          Sync your life with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">natural rhythm</span>.
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stop pushing against the tide. LunaSync helps you plan your goals, workouts, and study schedule based on the four natural phases of your cycle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button onClick={onStart} className="text-lg px-8 py-4">
            Get Started <ArrowRight size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 mb-4">
              <Activity />
            </div>
            <h3 className="font-bold text-lg mb-2">Body Intelligence</h3>
            <p className="text-gray-600 dark:text-gray-400">Understand why your energy fluctuates and how to leverage it for peak performance.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 mb-4">
              <Calendar />
            </div>
            <h3 className="font-bold text-lg mb-2">Smart Planning</h3>
            <p className="text-gray-600 dark:text-gray-400">Get AI-driven schedules that push you when you're strong and nurture you when you need rest.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 mb-4">
              <Sparkles />
            </div>
            <h3 className="font-bold text-lg mb-2">Personalized for You</h3>
            <p className="text-gray-600 dark:text-gray-400">Whether you're a student, creative, or athlete, our AI adapts advice to your specific interests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
