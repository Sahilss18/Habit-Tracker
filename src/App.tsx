import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';

// Pages
import Dashboard from './pages/Dashboard';
import HabitList from './pages/HabitList';
import HabitDetail from './pages/HabitDetail';
import HabitForm from './pages/HabitForm';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';

// Components
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HabitProvider>
        <Router>
          <div className="max-w-md mx-auto min-h-screen relative">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/habits" element={<HabitList />} />
              <Route path="/habit/:id" element={<HabitDetail />} />
              <Route path="/add-habit" element={<HabitForm />} />
              <Route path="/edit-habit/:id" element={<HabitForm />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Navigation />
          </div>
        </Router>
      </HabitProvider>
    </div>
  );
}

export default App;