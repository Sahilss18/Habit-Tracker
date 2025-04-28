import React from 'react';
import { CheckCircle, Circle, Trash2, Edit } from 'lucide-react';
import { Habit } from '../types';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../context/HabitContext';

interface HabitCardProps {
  habit: Habit;
  showActions?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, showActions = true }) => {
  const navigate = useNavigate();
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleHabitCompletion(habit.id, today);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-habit/${habit.id}`);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habit.id);
    }
  };
  
  const handleCardClick = () => {
    navigate(`/habit/${habit.id}`);
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-soft p-4 mb-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-2px]"
      style={{ 
        borderLeft: `4px solid ${habit.color}`,
        background: `linear-gradient(to right, ${habit.color}0a, white)`
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold gradient-text">{habit.title}</h3>
            <span
              className="ml-2 px-2 py-0.5 text-xs rounded-full text-white"
              style={{ backgroundColor: habit.color }}
            >
              {habit.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
          
          <div className="flex items-center mt-3">
            {habit.streakCount > 0 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center">
                🔥 {habit.streakCount} day streak
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {showActions && (
            <button
              onClick={handleToggle}
              className={`transform transition-all duration-300 p-2 rounded-xl ${
                isCompletedToday 
                  ? 'bg-green-100 text-green-500 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              aria-label={isCompletedToday ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompletedToday ? (
                <CheckCircle size={24} className="transform scale-110" />
              ) : (
                <Circle size={24} />
              )}
            </button>
          )}
          
          {showActions && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-blue-500 bg-gray-100 hover:bg-blue-100 rounded-xl transition-colors"
                aria-label="Edit habit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-100 rounded-xl transition-colors"
                aria-label="Delete habit"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;