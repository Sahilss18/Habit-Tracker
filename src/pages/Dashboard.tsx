import React from 'react';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { getCompletionRate } from '../utils/habitUtils';
import { Award, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { habits, user } = useHabits();
  
  const today = new Date().toISOString().split('T')[0];
  const todayHabits = habits.filter(habit => habit.frequency === 'daily');
  const completedToday = todayHabits.filter(habit => 
    habit.completedDates.includes(today)
  ).length;
  
  // Calculate overall statistics
  const totalCompletions = habits.reduce((sum, habit) => 
    sum + habit.completedDates.length, 0
  );
  
  return (
    <div className="pb-20">
      <PageHeader title="My Habits" />
      
      <div className="p-4">
        {/* Today's Progress */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Today's Progress</h2>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              Completed {completedToday} of {todayHabits.length} habits
            </span>
            <span className="text-sm font-medium">
              {todayHabits.length > 0 
                ? Math.round((completedToday / todayHabits.length) * 100) 
                : 0}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
              style={{ 
                width: todayHabits.length > 0 
                  ? `${(completedToday / todayHabits.length) * 100}%` 
                  : '0%'
              }}
            />
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold">{user.streakCount} days</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp size={20} className="text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">{user.completionRate}%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Award size={20} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Habits For Today */}
        <h2 className="text-lg font-semibold mb-3">Today's Habits</h2>
        
        {todayHabits.length > 0 ? (
          todayHabits.map(habit => (
            <HabitCard key={habit.id} habit={habit} />
          ))
        ) : (
          <EmptyState 
            message="You haven't created any habits yet"
            actionText="Create Your First Habit"
            actionPath="/add-habit"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;