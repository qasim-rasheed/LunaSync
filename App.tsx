import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('lunaSyncUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('lunaSyncUser', JSON.stringify(profile));
  };

  const handleReset = () => {
    setUser(null);
    localStorage.removeItem('lunaSyncUser');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow w-full">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? <Navigate to="/dashboard" /> : <LandingPage onStart={() => window.location.hash = '#/onboarding'} />
              } 
            />
            <Route 
              path="/onboarding" 
              element={
                user ? <Navigate to="/dashboard" /> : <Onboarding onComplete={(p) => {
                  handleOnboardingComplete(p);
                  // Small delay to allow state update before navigation logic triggers
                  setTimeout(() => window.location.hash = '#/dashboard', 100);
                }} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} /> : <Navigate to="/" />
              } 
            />
          </Routes>
        </main>

        {/* Footer / Debug Reset */}
        <footer className="py-6 text-center text-sm text-gray-400">
           <p>© {new Date().getFullYear()} LunaSync AI. Built for wellness.</p>
           {user && (
             <button onClick={handleReset} className="mt-2 text-xs underline hover:text-pink-500">
               Reset Data
             </button>
           )}
        </footer>
      </div>
    </Router>
  );
};

export default App;
