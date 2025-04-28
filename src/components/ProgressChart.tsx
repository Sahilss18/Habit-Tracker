import React from 'react';
import { Habit } from '../types';
import { formatDateForDisplay } from '../utils/habitUtils';

interface ProgressChartProps {
  habit: Habit;
  days?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ habit, days = 7 }) => {
  // Generate dates for the last N days
  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  const dateRange = generateDateRange();
  
  // Calculate completion rate for the period
  const completedInRange = dateRange.filter(date => 
    habit.completedDates.includes(date)
  ).length;
  
  const completionRate = Math.round((completedInRange / days) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Last {days} Days Progress</h3>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {formatDateForDisplay(dateRange[0])}
        </div>
        <div className="text-sm text-gray-600">
          {formatDateForDisplay(dateRange[dateRange.length - 1])}
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        {dateRange.map(date => {
          const isCompleted = habit.completedDates.includes(date);
          return (
            <div 
              key={date} 
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'}`}
              >
                {isCompleted ? '✓' : ''}
              </div>
              <span className="text-xs">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Completion Rate</span>
          <span className="text-sm font-medium text-gray-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;