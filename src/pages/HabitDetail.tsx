import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHabits } from '../context/HabitContext';
import PageHeader from '../components/PageHeader';
import ProgressChart from '../components/ProgressChart';
import StreakCalendar from '../components/StreakCalendar';
import { formatDateForDisplay, getCompletionRate } from '../utils/habitUtils';
import { Edit, Trash2, Bell, BellOff, CheckCircle, Calendar } from 'lucide-react';

const HabitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHabitById, toggleHabitCompletion, deleteHabit, updateHabit } = useHabits();
  
  const habit = getHabitById(id as string);
  
  if (!habit) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Habit not found</h2>
        <button
          onClick={() => navigate('/habits')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back to Habits
        </button>
      </div>
    );
  }
  
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  const handleDeleteHabit = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habit.id);
      navigate('/habits');
    }
  };
  
  const handleToggleReminder = () => {
    updateHabit({
      ...habit,
      reminderEnabled: !habit.reminderEnabled
    });
  };
  
  // Stats
  const completionRate = getCompletionRate(habit.completedDates, habit.createdAt);
  
  return (
    <div className="pb-20">
      <PageHeader 
        title={habit.title} 
        showBackButton={true}
        rightAction={
          <div className="flex">
            <button
              onClick={() => navigate(`/edit-habit/${habit.id}`)}
              className="p-2 text-gray-500 hover:text-blue-500"
              aria-label="Edit habit"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={handleDeleteHabit}
              className="p-2 text-gray-500 hover:text-red-500"
              aria-label="Delete habit"
            >
              <Trash2 size={20} />
            </button>
          </div>
        }
      />
      
      <div className="p-4">
        {/* Habit Info */}
        <div 
          className="bg-white rounded-lg shadow-md p-4 mb-4"
          style={{ borderLeft: `4px solid ${habit.color}` }}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500">{habit.category}</p>
              <h2 className="text-xl font-bold">{habit.title}</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3">{habit.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-1" />
              <span>Started on {formatDateForDisplay(habit.createdAt)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <button
                onClick={handleToggleReminder}
                className="flex items-center mr-1"
              >
                {habit.reminderEnabled ? (
                  <Bell size={16} className="text-blue-500" />
                ) : (
                  <BellOff size={16} />
                )}
              </button>
              <span>
                {habit.reminderEnabled
                  ? `Reminder at ${habit.reminderTime || 'Default Time'}`
                  : 'No reminders'}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => toggleHabitCompletion(habit.id, today)}
            className={`w-full flex items-center justify-center py-3 rounded-lg text-white transition-colors ${
              isCompletedToday ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            <CheckCircle size={20} className="mr-2" />
            {isCompletedToday ? 'Completed Today' : 'Mark as Complete'}
          </button>
        </div>
        
        {/* Statistics */}
        <ProgressChart habit={habit} />
        
        <StreakCalendar habit={habit} />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-2xl font-bold">
              {habit.streakCount} {habit.streakCount === 1 ? 'day' : 'days'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold">{completionRate}%</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Times Completed</p>
            <p className="text-2xl font-bold">{habit.completedDates.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Best Streak</p>
            <p className="text-2xl font-bold">{habit.streakCount} days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetail;