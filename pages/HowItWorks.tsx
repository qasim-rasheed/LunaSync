import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Activity, 
  Database, 
  Sparkles, 
  Zap, 
  Battery, 
  BatteryCharging, 
  BatteryFull, 
  BatteryMedium 
} from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState(2); // Start with Ovulatory as it's high energy

  const phases = [
    {
      id: 0,
      name: "Menstrual",
      icon: <Battery size={24} />,
      energy: "Reflective & Restorative",
      color: "bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200",
      desc: "Hormones are at their lowest. Your brain is wired for evaluation and intuition, not high-intensity execution.",
      appAction: "LunaSync schedules rest, gentle yoga, and high-nutrient comfort foods."
    },
    {
      id: 1,
      name: "Follicular",
      icon: <BatteryCharging size={24} />,
      energy: "Rising & Creative",
      color: "bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-900/30 dark:text-violet-200",
      desc: "Estrogen rises. Creativity spikes. It's the best time to brainstorm, learn new skills, and plan the month ahead.",
      appAction: "We suggest creative projects, cardio, and fresh, light nutrition."
    },
    {
      id: 2,
      name: "Ovulatory",
      icon: <BatteryFull size={24} />,
      energy: "Peak & Social",
      color: "bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-900/30 dark:text-teal-200",
      desc: "Estrogen peaks. Verbal skills and confidence are highest. You are magnetic. Perfect for pitching and dating.",
      appAction: "We push you to network, lift heavy, and socialize."
    },
    {
      id: 3,
      name: "Luteal",
      icon: <BatteryMedium size={24} />,
      energy: "Focus & Finish",
      color: "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200",
      desc: "Progesterone rises, calming the brain but increasing metabolic need. Great for deep work and wrapping up tasks.",
      appAction: "We focus on administrative tasks, organizing, and blood-sugar stabilizing foods."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      


      <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        
        {/* HERO */}
        <div className="text-center space-y-6 animate-fade-in-up">
           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
             We decode your <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Infradian Rhythm.</span>
           </h1>
           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             Most productivity tools assume you are the same person every day. Biology says otherwise. Here is how LunaSync adapts to you.
           </p>
        </div>

        {/* STEP 1: THE INPUT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Abstract Visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-violet-200 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
            <div className="relative glass rounded-3xl p-8 border border-white/50 dark:border-gray-700 space-y-4">
               <div className="flex gap-3">
                 <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"> Vegan 🌱</div>
                 <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"> Night Owl 🦉</div>
               </div>
               <div className="flex gap-3">
                 <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"> Anxiety Prone 🌊</div>
                 <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium"> Marathon Training 🏃‍♀️</div>
               </div>
               <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
               <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <Database size={20} />
                  <span className="text-sm">Analyzing generic data...</span>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4">
             <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-2xl flex items-center justify-center text-pink-600 mb-4">
               <span className="font-bold text-xl">1</span>
             </div>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">It starts with <span className="italic text-pink-500">context</span>.</h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
               A generic "wake up at 5AM" rule doesn't work if you are a Night Owl in your Luteal phase. LunaSync takes 15+ data points—from your dietary needs to your emotional landscape—to build a profile of the <i>real</i> you.
             </p>
          </div>
        </div>

        {/* STEP 2: INTERACTIVE ENGINE */}
        <div className="space-y-8">
           <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-violet-100 dark:bg-violet-900/50 rounded-2xl flex items-center justify-center text-violet-600 mb-4">
                 <span className="font-bold text-xl">2</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Rhythm Engine</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Click a phase to see how the engine adapts.</p>
           </div>

           <div className="glass rounded-3xl p-2 border border-white/50 dark:border-gray-700 flex flex-col md:flex-row gap-2">
              {/* Phase Selector */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible p-2 md:w-1/4">
                 {phases.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePhase(p.id)}
                      className={`px-4 py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3 whitespace-nowrap
                        ${activePhase === p.id 
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                       {p.icon}
                       <span className="font-medium">{p.name}</span>
                    </button>
                 ))}
              </div>

              {/* Dynamic Content Area */}
              <div className="flex-1 p-6 md:p-12 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all">
                 <div className={`absolute top-0 right-0 p-32 opacity-10 rounded-full filter blur-3xl transition-colors duration-500 ${phases[activePhase].color.split(' ')[0]}`}></div>
                 
                 <div className="relative z-10 animate-fade-in space-y-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-sm font-bold uppercase tracking-wider ${phases[activePhase].color}`}>
                       <Activity size={14} /> {phases[activePhase].energy}
                    </div>
                    
                    <div>
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Biological Reality</h3>
                       <p className="text-gray-600 dark:text-gray-300 text-lg">{phases[activePhase].desc}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-l-4 border-pink-500">
                       <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                         <Sparkles size={16} className="text-pink-500"/> LunaSync Action Plan
                       </h4>
                       <p className="text-gray-600 dark:text-gray-400">{phases[activePhase].appAction}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* STEP 3: THE OUTPUT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-2xl flex items-center justify-center text-teal-600 mb-4">
                 <span className="font-bold text-xl">3</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Precision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Every morning, you get a fresh plan. Not a generic to-do list, but a biological permission slip. We tell you when to push hard and when to protect your peace.
              </p>
              <ul className="space-y-3 pt-4">
                 {[
                   "Workout intensity based on cortisol tolerance", 
                   "Work tasks matched to brain chemistry", 
                   "Nutrition tips for hormone balance"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                        <Zap size={14} />
                      </div>
                      {item}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative">
              {/* Mock Day Card */}
              <div className="absolute inset-0 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>
              <div className="glass rounded-3xl p-8 border border-white/50 dark:border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Today's Focus</h3>
                 <p className="text-pink-500 font-medium mb-6">Pitching & People</p>
                 <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                       <span className="text-xs font-bold text-gray-400 uppercase">Productivity</span>
                       <p className="font-medium text-gray-800 dark:text-gray-200">Schedule big meetings. Your verbal centers are active.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                       <span className="text-xs font-bold text-gray-400 uppercase">Movement</span>
                       <p className="font-medium text-gray-800 dark:text-gray-200">High Intensity Interval Training (HIIT).</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to stop swimming upstream?</h2>
           <Button onClick={() => navigate('/onboarding')} className="text-lg px-8 py-4 shadow-xl shadow-pink-500/20">
             Start Your Sync <ArrowRight size={20} />
           </Button>
        </div>

      </div>
    </div>
  );
};