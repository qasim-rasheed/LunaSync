import React, { useEffect, useState, useMemo, useRef } from 'react';
import { UserProfile, CyclePhase, DayPlan, PlanItem, CalendarEvent } from '../types';
import { PHASE_COLORS, PHASE_DESCRIPTIONS } from '../constants';
import { generateDailyAdvice } from '../services/geminiService';
import { Calendar, Droplet, Zap, BookOpen, Heart, Activity, CalendarPlus, Loader2, Clock, Check, Plus, X, Trash2, ArrowRight, ChevronRight, ChevronLeft, Edit2, GripVertical, Save } from 'lucide-react';
import { Button } from '../components/Button';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [plan, setPlan] = useState<DayPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Planning Mode State
  const [viewMode, setViewMode] = useState<'recommendations' | 'calendar'>('recommendations');
  const [selectedActions, setSelectedActions] = useState<PlanItem[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [customEventText, setCustomEventText] = useState('');
  const [activeCalendarDay, setActiveCalendarDay] = useState<Date | null>(null);
  
  // Editing State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemText, setEditItemText] = useState('');
  const [editItemCategory, setEditItemCategory] = useState<'work' | 'movement' | 'nutrition' | 'selfcare'>('work');
  
  // New Item Category State
  const [newItemCategory, setNewItemCategory] = useState<'work' | 'movement' | 'nutrition' | 'selfcare'>('work');

  // Drag and Drop State
  const [draggedItem, setDraggedItem] = useState<{ item: PlanItem, sourceDateIso: string } | null>(null);

  // Calculate Cycle Stats
  const cycleStats = useMemo(() => {
    const lastPeriod = new Date(user.lastPeriodDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastPeriod.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Simple Cycle Math
    const currentDay = ((diffDays - 1) % user.cycleLength) + 1;
    
    let phase = CyclePhase.MENSTRUAL;
    let daysUntilNextPhase = 0;
    let nextPhaseName = CyclePhase.FOLLICULAR;

    if (currentDay <= 5) {
      phase = CyclePhase.MENSTRUAL;
      daysUntilNextPhase = 5 - currentDay;
      nextPhaseName = CyclePhase.FOLLICULAR;
    }
    else if (currentDay <= 14) {
      phase = CyclePhase.FOLLICULAR;
      daysUntilNextPhase = 14 - currentDay;
      nextPhaseName = CyclePhase.OVULATORY;
    }
    else if (currentDay <= 17) {
      phase = CyclePhase.OVULATORY;
      daysUntilNextPhase = 17 - currentDay;
      nextPhaseName = CyclePhase.LUTEAL;
    }
    else {
      phase = CyclePhase.LUTEAL;
      daysUntilNextPhase = user.cycleLength - currentDay;
      nextPhaseName = CyclePhase.MENSTRUAL;
    }

    return { currentDay, phase, daysUntilNextPhase, nextPhaseName };
  }, [user]);

  // Calendar Generation Logic
  const phaseCalendar = useMemo(() => {
    const days = [];
    const today = new Date();
    const daysToShow = Math.min(cycleStats.daysUntilNextPhase + 1, 14); 

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  }, [cycleStats]);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      const result = await generateDailyAdvice(user, cycleStats.phase, cycleStats.currentDay);
      if (result) {
        setPlan({
          date: new Date().toLocaleDateString(),
          phase: cycleStats.phase,
          ...result
        });
      } else {
        setError("Could not connect to Luna's wisdom. Please check your connection.");
      }
      setLoading(false);
    };

    fetchPlan();
  }, [user, cycleStats]);

  // --- Handlers ---

  const toggleActionSelection = (text: string, category: 'work' | 'movement' | 'nutrition' | 'selfcare') => {
    const id = `${category}-${text}`;
    const exists = selectedActions.find(a => a.id === id);
    
    if (exists) {
      setSelectedActions(prev => prev.filter(a => a.id !== id));
    } else {
      setSelectedActions(prev => [...prev, { id, text, category, phase: cycleStats.phase }]);
    }
  };

  const handleBuildPlan = () => {
    const newEvents: CalendarEvent[] = phaseCalendar.map((date, index) => ({
      id: date.toISOString(),
      date: date,
      items: []
    }));

    selectedActions.forEach((item, index) => {
      const dayIndex = index % newEvents.length;
      newEvents[dayIndex].items.push(item);
    });

    setCalendarEvents(newEvents);
    setViewMode('calendar');
  };

  const addCustomEvent = (date: Date) => {
    if (!customEventText.trim()) return;
    
    const newItem: PlanItem = {
      id: `custom-${Date.now()}`,
      text: customEventText,
      category: newItemCategory,
      phase: cycleStats.phase
    };

    setCalendarEvents(prev => prev.map(evt => {
      if (evt.date.toDateString() === date.toDateString()) {
        return { ...evt, items: [...evt.items, newItem] };
      }
      return evt;
    }));
    setCustomEventText('');
    setNewItemCategory('work'); // Reset to default
  };

  const removeEventItem = (dateIso: string, itemId: string) => {
    setCalendarEvents(prev => prev.map(evt => {
      if (evt.id === dateIso) {
        return { ...evt, items: evt.items.filter(i => i.id !== itemId) };
      }
      return evt;
    }));
  };

  // Edit Logic
  const startEditing = (item: PlanItem) => {
    setEditingItemId(item.id);
    setEditItemText(item.text);
    setEditItemCategory(item.category);
  };

  const saveEdit = (dateIso: string, itemId: string) => {
    setCalendarEvents(prev => prev.map(evt => {
      if (evt.id === dateIso) {
        return {
          ...evt,
          items: evt.items.map(i => i.id === itemId ? { ...i, text: editItemText, category: editItemCategory } : i)
        };
      }
      return evt;
    }));
    setEditingItemId(null);
  };

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  // Drag and Drop Logic
  const handleDragStart = (e: React.DragEvent, item: PlanItem, sourceDateIso: string) => {
    setDraggedItem({ item, sourceDateIso });
    e.dataTransfer.effectAllowed = 'move';
    // Set a transparent drag image or custom if needed, defaulting to element
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDateIso: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { item, sourceDateIso } = draggedItem;

    if (sourceDateIso === targetDateIso) {
      setDraggedItem(null);
      return; // Dropped on same day, do nothing (or reorder if implemented)
    }

    setCalendarEvents(prev => {
      // Remove from source
      const newEvents = prev.map(evt => {
        if (evt.id === sourceDateIso) {
          return { ...evt, items: evt.items.filter(i => i.id !== item.id) };
        }
        return evt;
      });

      // Add to target
      return newEvents.map(evt => {
        if (evt.id === targetDateIso) {
          return { ...evt, items: [...evt.items, item] };
        }
        return evt;
      });
    });

    setDraggedItem(null);
  };


  // Calendar Helpers
  const addUpcomingEventToCalendar = () => {
    if (!plan || !plan.upcomingEvent) return;
    
    const today = new Date();
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + plan.upcomingEvent.daysOffset);
    
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    const dateString = formatDate(eventDate);
    const nextDay = new Date(eventDate);
    nextDay.setDate(eventDate.getDate() + 1);
    const nextDayString = formatDate(nextDay);

    const title = `LunaSync: Preparing for ${cycleStats.nextPhaseName} Phase`;
    const details = `${plan.upcomingEvent.description}\n\nReminder: Log in to LunaSync today to generate your new phase plan!`;
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${dateString}/${nextDayString}`;
    window.open(url, '_blank');
  };

  const addSingleItemToCalendar = (text: string, category: string) => {
    const title = `LunaSync: ${text} (${category})`;
    const details = `Generated by LunaSync for your ${cycleStats.phase} phase.`;
    
    const now = new Date();
    const startDate = now.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0]; 
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    const endDate = nextDay.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${startDate}/${endDate}`;
    window.open(url, '_blank');
  };

  const addDayToCalendar = (event: CalendarEvent) => {
    if (event.items.length === 0) return;

    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
    const dateString = formatDate(event.date);
    const nextDay = new Date(event.date);
    nextDay.setDate(event.date.getDate() + 1);
    const nextDayString = formatDate(nextDay);

    const title = `LunaSync Phase Plan: ${event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`;
    const details = event.items.map(i => `[${i.category.toUpperCase()}] ${i.text}`).join('\n');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${dateString}/${nextDayString}`;
    window.open(url, '_blank');
  };

  const syncToGoogleCalendar = () => {
    const eventsToSync = calendarEvents.filter(e => e.items.length > 0);
    if (eventsToSync.length === 0) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LunaSync//Cycle Planner//EN',
      'CALSCALE:GREGORIAN'
    ].join('\r\n') + '\r\n';

    eventsToSync.forEach(event => {
      const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "").split("T")[0];
      
      const startDate = formatDate(event.date);
      const nextDay = new Date(event.date);
      nextDay.setDate(event.date.getDate() + 1);
      const endDate = formatDate(nextDay);

      const title = "LunaSync Day Plan";
      const description = event.items
        .map(i => `[${i.category.toUpperCase()}] ${i.text}`)
        .join('\\n');

      const eventBlock = [
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${startDate}`,
        `DTEND;VALUE=DATE:${endDate}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n') + '\r\n';

      icsContent += eventBlock;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lunasync_phase_plan.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryColors = {
    work: 'blue',
    movement: 'orange',
    nutrition: 'green',
    selfcare: 'pink'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hello {user.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Here is your cycle-synced forecast for today.</p>
        </div>
        
        <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 shadow-sm ${PHASE_COLORS[cycleStats.phase]}`}>
          <div className="font-bold text-lg">{cycleStats.phase} Phase</div>
          <div className="text-sm opacity-80">Day {cycleStats.currentDay}</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Visual & Calendar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Phase Card */}
          <div className="glass rounded-3xl p-6 border border-white/50 dark:border-gray-700">
            <div className="flex justify-center mb-6 relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90 origin-center" viewBox="0 0 192 192">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="90"
                  cx="96"
                  cy="96"
                />
                <circle
                  className={`${cycleStats.phase === CyclePhase.MENSTRUAL ? 'text-rose-400' : cycleStats.phase === CyclePhase.FOLLICULAR ? 'text-violet-400' : cycleStats.phase === CyclePhase.OVULATORY ? 'text-teal-400' : 'text-amber-400'}`}
                  strokeWidth="12"
                  strokeDasharray={565}
                  strokeDashoffset={565 - (565 * cycleStats.currentDay) / user.cycleLength}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="90"
                  cx="96"
                  cy="96"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">{cycleStats.currentDay}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Cycle Day</span>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Phase Insight</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {PHASE_DESCRIPTIONS[cycleStats.phase]}
              </p>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="glass rounded-3xl p-6 border border-white/50 dark:border-gray-700 flex flex-col gap-4">
             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Calendar size={20} /> Next Phase
             </h3>
             
             <div className="space-y-3">
                {loading ? (
                    <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                ) : plan?.upcomingEvent ? (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-800/40 border border-pink-100 dark:border-gray-600 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-xs font-bold px-2 py-1 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300 uppercase tracking-wider flex items-center gap-1">
                             <Clock size={10} /> In {plan.upcomingEvent.daysOffset} days
                           </span>
                        </div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2 text-base">
                            Preparing for {cycleStats.nextPhaseName}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
                            {plan.upcomingEvent.description}
                            <br/><br/>
                            <span className="font-medium text-pink-500">Reminder: Come back on this day to create your new plan!</span>
                        </p>
                        
                        <button 
                          onClick={addUpcomingEventToCalendar}
                          className="mt-3 w-full py-2 text-xs font-bold text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors border border-pink-200 dark:border-pink-800 flex items-center justify-center gap-2"
                        >
                          <CalendarPlus size={14} /> Add Reminder to Calendar
                        </button>
                    </div>
                ) : null}
             </div>
          </div>
        </div>

        {/* Right Col: Recommendations OR Calendar */}
        <div className="lg:col-span-2 space-y-6 relative">
          
          {loading ? (
             <div className="h-96 glass rounded-3xl flex flex-col items-center justify-center text-gray-500 animate-pulse">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p>Consulting holistic experts...</p>
             </div>
          ) : error ? (
             <div className="h-64 glass rounded-3xl flex items-center justify-center text-red-500">
                {error}
             </div>
          ) : viewMode === 'recommendations' ? (
            // --- VIEW 1: RECOMMENDATION SELECTION ---
            <>
              <div className="glass rounded-3xl p-8 border-l-8 border-l-indigo-400 dark:border-l-indigo-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={100} />
                 </div>
                 <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Daily Focus</h2>
                 <p className="text-lg text-gray-700 dark:text-gray-200 italic">"{plan?.summary}"</p>
                 <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    <Activity size={16} /> Mood Forecast: {plan?.moodForecast}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {[
                  { icon: <BookOpen size={24} />, title: "Work & Study", color: "blue", text: plan?.productivityHack, list: plan?.recommendations?.work || [], type: 'work' },
                  { icon: <Activity size={24} />, title: "Movement", color: "orange", text: plan?.workoutRecommendation, list: plan?.recommendations?.movement || [], type: 'movement' },
                  { icon: <Droplet size={24} />, title: "Nutrition", color: "green", text: plan?.nutritionTip, list: plan?.recommendations?.nutrition || [], type: 'nutrition' },
                  { icon: <Heart size={24} />, title: "Self Care", color: "pink", text: plan?.selfCareAction, list: plan?.recommendations?.selfcare || [], type: 'selfcare' },
                ].map((card) => (
                  <div key={card.title} className="glass rounded-3xl p-6 flex flex-col h-full">
                     <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600 dark:bg-${card.color}-900 dark:text-${card.color}-300`}>
                           {card.icon}
                        </div>
                        <h3 className="font-bold text-lg">{card.title}</h3>
                     </div>
                     <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{card.text}</p>
                     
                     <div className="mt-auto space-y-2">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Suggestions for You:</p>
                       <div className="flex flex-wrap gap-2">
                         {card.list.map((item) => {
                           const isSelected = selectedActions.find(a => a.id === `${card.type}-${item}`);
                           return (
                             <div key={item} className="flex items-center gap-1 group/chip">
                               <button
                                 onClick={() => toggleActionSelection(item, card.type as any)}
                                 className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex-1
                                   ${isSelected 
                                     ? `bg-${card.color}-100 border-${card.color}-500 text-${card.color}-800 dark:bg-${card.color}-900/40 dark:text-${card.color}-200` 
                                     : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400'
                                   }`}
                               >
                                 {isSelected && <Check size={10} className="inline mr-1" />}
                                 {item}
                               </button>
                               
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   addSingleItemToCalendar(item, card.title);
                                 }}
                                 className="p-1.5 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-transparent hover:border-pink-200 transition-all opacity-0 group-hover/chip:opacity-100"
                                 title="Add just this to calendar"
                               >
                                 <CalendarPlus size={14} />
                               </button>
                             </div>
                           );
                         })}
                       </div>
                     </div>
                  </div>
                ))}
              </div>

              {selectedActions.length >= 3 && (
                <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
                  <Button 
                    onClick={handleBuildPlan}
                    className="shadow-2xl shadow-pink-500/40 text-lg px-8 py-4 flex items-center gap-2"
                  >
                    Build Phase Plan <ArrowRight size={20} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            // --- VIEW 2: CALENDAR ---
            <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Phase Plan</h2>
                   <p className="text-gray-500">Plan until next phase ({cycleStats.daysUntilNextPhase} days left)</p>
                 </div>
                 <div className="flex gap-2">
                   <Button variant="secondary" onClick={() => setViewMode('recommendations')} className="text-sm">
                     <ChevronLeft size={16} /> Edit
                   </Button>
                   <Button onClick={syncToGoogleCalendar} className="text-sm">
                     <CalendarPlus size={16} /> Sync Google
                   </Button>
                 </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {calendarEvents.map((evt, idx) => (
                   <div 
                     key={evt.id} 
                     className="glass rounded-2xl p-5 border border-white/50 dark:border-gray-700 relative group"
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, evt.id)}
                   >
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                            {evt.date.getDate()}
                          </span>
                          {evt.date.toLocaleDateString('en-US', { weekday: 'long' })}
                        </span>
                        
                        <div className="flex gap-1">
                          <button 
                            onClick={() => addDayToCalendar(evt)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-pink-500 transition-colors"
                            title="Add this day to Calendar"
                          >
                            <CalendarPlus size={18} />
                          </button>
                          <button 
                            onClick={() => setActiveCalendarDay(activeCalendarDay === evt.date ? null : evt.date)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-pink-500 transition-colors"
                            title="Add item"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2 min-h-[60px]">
                        {evt.items.length > 0 ? evt.items.map(item => (
                          <div 
                            key={item.id} 
                            draggable
                            onDragStart={(e) => handleDragStart(e, item, evt.id)}
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 group/item p-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-move"
                          >
                             {editingItemId === item.id ? (
                               <div className="flex-1 flex flex-col gap-2 animate-fade-in">
                                 <input 
                                   type="text" 
                                   value={editItemText}
                                   onChange={(e) => setEditItemText(e.target.value)}
                                   className="text-sm px-2 py-1 rounded border bg-white dark:bg-gray-800 w-full"
                                   autoFocus
                                 />
                                 <div className="flex justify-between items-center">
                                   <select 
                                     value={editItemCategory}
                                     onChange={(e) => setEditItemCategory(e.target.value as any)}
                                     className="text-xs px-1 py-1 rounded bg-gray-100 dark:bg-gray-700 border-none outline-none"
                                   >
                                     <option value="work">Work</option>
                                     <option value="movement">Movement</option>
                                     <option value="nutrition">Nutrition</option>
                                     <option value="selfcare">Self Care</option>
                                   </select>
                                   <div className="flex gap-1">
                                     <button onClick={() => saveEdit(evt.id, item.id)} className="p-1 text-green-500 hover:bg-green-100 rounded"><Check size={14}/></button>
                                     <button onClick={cancelEdit} className="p-1 text-red-500 hover:bg-red-100 rounded"><X size={14}/></button>
                                   </div>
                                 </div>
                               </div>
                             ) : (
                               <>
                                 <GripVertical size={14} className="text-gray-300 cursor-grab opacity-0 group-hover/item:opacity-100" />
                                 <span className={`w-2 h-2 rounded-full bg-${categoryColors[item.category]}-400 shrink-0`}></span>
                                 <span className="flex-1 truncate">{item.text}</span>
                                 <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                   <button onClick={() => startEditing(item)} className="text-gray-400 hover:text-blue-500">
                                     <Edit2 size={12} />
                                   </button>
                                   <button onClick={() => removeEventItem(evt.id, item.id)} className="text-gray-400 hover:text-red-500">
                                     <X size={12} />
                                   </button>
                                 </div>
                               </>
                             )}
                          </div>
                        )) : (
                          <div className="text-xs text-gray-400 italic py-2 text-center">Drag items here</div>
                        )}
                      </div>

                      {/* Inline Add Input */}
                      {activeCalendarDay === evt.date && (
                         <div className="mt-3 flex flex-col gap-2 animate-fade-in p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-pink-100 dark:border-gray-700">
                            <input 
                              autoFocus
                              type="text" 
                              value={customEventText}
                              onChange={(e) => setCustomEventText(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && addCustomEvent(evt.date)}
                              placeholder="Add task..."
                              className="flex-1 text-xs px-2 py-1.5 rounded border bg-transparent outline-none focus:border-pink-500"
                            />
                            <div className="flex justify-between items-center">
                              <select 
                                value={newItemCategory}
                                onChange={(e) => setNewItemCategory(e.target.value as any)}
                                className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 border-none outline-none"
                              >
                                <option value="work">Work</option>
                                <option value="movement">Movement</option>
                                <option value="nutrition">Nutrition</option>
                                <option value="selfcare">Self Care</option>
                              </select>
                              <button onClick={() => addCustomEvent(evt.date)} className="text-pink-500 text-xs font-bold px-2 hover:bg-pink-50 rounded">Add</button>
                            </div>
                         </div>
                      )}
                   </div>
                 ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};