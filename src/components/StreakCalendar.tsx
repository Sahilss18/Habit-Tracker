import React from 'react';
import { Habit } from '../types';

interface StreakCalendarProps {
  habit: Habit;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ habit }) => {
  // Generate calendar grid for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); 
    
    // Create array for days of the month plus empty slots for first week
    const calendarDays = Array(startDayOfWeek).fill(null);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      calendarDays.push({
        date: dateString,
        day,
        isCompleted: habit.completedDates.includes(dateString),
        isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
        isToday: dateString === new Date().toISOString().split('T')[0]
      });
    }
    
    return calendarDays;
  };
  
  const calendarDays = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Monthly Overview</h3>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-xs text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {day === null ? (
              <div className="w-full h-full"></div>
            ) : (
              <div 
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm
                  ${day.isToday ? 'ring-2 ring-blue-500' : ''}
                  ${day.isCompleted 
                    ? 'bg-green-500 text-white' 
                    : day.isPast 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'text-gray-700'
                  }
                `}
              >
                {day.day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCalendar;