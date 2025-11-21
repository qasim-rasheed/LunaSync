import React from 'react';
import { ArrowRight, Calendar, Sparkles, Activity, Zap, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:bg-pink-900/40"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:bg-violet-900/40"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:bg-teal-900/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          {/* Left: Copy */}
          <div className="space-y-8 animate-fade-in-up text-center lg:text-left">
            
          
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Harmonize your life with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">biology.</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Most planners ignore your physiology. LunaSync adapts your productivity, fitness, and nutrition to your natural infradian rhythm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={onStart} className="text-lg px-8 py-4 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 transition-all">
                Try the Demo <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/how-it-works')}
                className="text-lg px-8 py-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30"
              >
                How it Works
              </Button>
            </div>

            {/* UPDATED SOCIAL PROOF: Removed specific numbers */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold overflow-hidden grayscale opacity-70`}>
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*55}&backgroundColor=b6e3f4`} alt="User" />
                   </div>
                 ))}
              </div>
              <p>Be the first to experience LunaSync. <span className="text-pink-600 dark:text-pink-400 font-semibold">Early access.</span></p>
            </div>
          </div>

          {/* Right: Visual Mockup (CSS Only - Unchanged from previous modern version) */}
          <div className="relative hidden lg:block animate-float">
            {/* Main Glass Card */}
            <div className="relative z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/50 dark:border-gray-600 rounded-3xl p-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-all duration-500">
              {/* Mock Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-200/50 dark:border-gray-700/50 pb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-violet-500"></div>
                   <div>
                     <div className="h-2 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                     <div className="h-2 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                   </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 text-xs font-bold">
                  Ovulatory Phase
                </div>
              </div>

              {/* Mock Circular Graph */}
              <div className="flex gap-6">
                 <div className="w-32 h-32 rounded-full border-8 border-pink-100 dark:border-gray-700 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-8 border-pink-500 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                    <div className="text-center">
                       <span className="block text-2xl font-bold text-gray-800 dark:text-white">Day 14</span>
                       <span className="text-[10px] text-gray-500 uppercase">Peak Energy</span>
                    </div>
                 </div>
                 
                 <div className="flex-1 space-y-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-900/50 border border-pink-100 dark:border-gray-700 shadow-sm">
                       <div className="flex items-center gap-2 mb-1">
                          <Zap size={14} className="text-yellow-500" /> 
                          <span className="text-xs font-bold">Today's Superpower</span>
                       </div>
                       <div className="text-sm text-gray-600 dark:text-gray-300">Pitching big ideas & social networking.</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-900/50 border border-pink-100 dark:border-gray-700 shadow-sm">
                       <div className="flex items-center gap-2 mb-1">
                          <Activity size={14} className="text-rose-500" /> 
                          <span className="text-xs font-bold">Workout</span>
                       </div>
                       <div className="text-sm text-gray-600 dark:text-gray-300">HIIT or Spin Class (High Intensity).</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Floating Element Behind */}
            <div className="absolute top-10 -right-8 -z-10 w-64 h-64 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-3xl rotate-12 opacity-60 blur-md"></div>
          </div>
        </div>

        {/* FEATURES GRID (Bento Style) */}
        <div className="space-y-12">
           <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">More than just a period tracker.</h2>
              <p className="text-gray-500 dark:text-gray-400">Comprehensive lifestyle design for every phase of your cycle.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group relative overflow-hidden p-8 rounded-3xl bg-white/40 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Activity size={120} />
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 mb-6">
                    <Activity />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Body Intelligence</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Understand the "why" behind your energy fluctuations. We decode your hormones so you can stop fighting your body and start leveraging it.
                 </p>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden p-8 rounded-3xl bg-white/40 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Calendar size={120} />
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 mb-6">
                    <Calendar />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Planning</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Our AI scans your calendar and suggests the best days for big presentations, deep work, or rest, automatically syncing with your Google Calendar.
                 </p>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden p-8 rounded-3xl bg-white/40 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Heart size={120} />
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 mb-6">
                    <Heart />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hyper-Personalized</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Whether you're vegan, keto, training for a marathon, or writing a thesis, our advice adapts to YOUR specific goals and lifestyle.
                 </p>
              </div>
           </div>
        </div>
        
        {/* TRUST BADGE SECTION */}
        <div className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
           <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Backed by Science</p>
           <div className="flex gap-8 items-center text-gray-500 font-bold text-lg">
              <span className="flex items-center gap-2"><ShieldCheck size={18}/> Private</span>
              <span className="flex items-center gap-2"><Activity size={18}/> Accurate</span>
              <span className="flex items-center gap-2"><Zap size={18}/> AI-Driven</span>
           </div>
        </div>

      </div>
    </div>
  );
};