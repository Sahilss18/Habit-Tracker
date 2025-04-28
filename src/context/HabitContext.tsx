import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, User } from '../types';
import { generateSampleHabits } from '../utils/sampleData';
import { calculateStreak } from '../utils/habitUtils';

interface HabitContextType {
  habits: Habit[];
  user: User;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streakCount'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  getHabitById: (id: string) => Habit | undefined;
  updateUser: (userData: Partial<User>) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Clear existing localStorage data
  localStorage.removeItem('user');
  localStorage.removeItem('habits');

  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : generateSampleHabits();
  });

  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Sahil Singh',
      email: 'ss7227@srmist.edu.in',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedDate: new Date().toISOString(),
      streakCount: 0,
      completionRate: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    
    // Update user stats
    const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
    const totalPossible = habits.length * 30; // Simplified calculation
    const completionRate = totalPossible > 0 ? (totalCompletions / totalPossible) * 100 : 0;
    
    const maxStreak = habits.reduce((max, habit) => Math.max(max, habit.streakCount), 0);
    
    setUser(prevUser => ({
      ...prevUser,
      streakCount: maxStreak,
      completionRate: Math.round(completionRate)
    }));
    
    localStorage.setItem('user', JSON.stringify(user));
  }, [habits, user]);

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streakCount'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      completedDates: [],
      streakCount: 0
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id !== id) return habit;
        
        const isCompleted = habit.completedDates.includes(date);
        const updatedCompletedDates = isCompleted
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        
        const streakCount = calculateStreak(updatedCompletedDates);
        
        return {
          ...habit,
          completedDates: updatedCompletedDates,
          streakCount
        };
      })
    );
  };

  const getHabitById = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  return (
    <HabitContext.Provider 
      value={{ 
        habits, 
        user, 
        addHabit, 
        updateHabit, 
        deleteHabit, 
        toggleHabitCompletion,
        getHabitById,
        updateUser
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};