import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import PageHeader from '../components/PageHeader';
import { formatDateForDisplay } from '../utils/habitUtils';
import { Award, Medal, Calendar, Activity } from 'lucide-react';

const Statistics: React.FC = () => {
  const { habits, user } = useHabits();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  // Sort habits by completion rate
  const sortedHabits = [...habits].sort((a, b) => {
    return b.completedDates.length - a.completedDates.length;
  });
  
  // Get top 3 habits
  const topHabits = sortedHabits.slice(0, 3);
  
  // Calculate stats for selected timeframe
  const calculateTimeframeStats = () => {
    const now = new Date();
    let startDate: Date;
    
    if (selectedTimeframe === 'week') {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);
    } else if (selectedTimeframe === 'month') {
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate = new Date(now);
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    
    const startDateStr = startDate.toISOString().split('T')[0];
    let totalCompletions = 0;
    let totalPossible = 0;
    
    habits.forEach(habit => {
      const completionsInTimeframe = habit.completedDates.filter(
        date => date >= startDateStr
      ).length;
      
      totalCompletions += completionsInTimeframe;
      
      // Calculate possible completions based on when the habit was created
      const habitStartDate = new Date(habit.createdAt);
      const effectiveStartDate = habitStartDate > startDate ? habitStartDate : startDate;
      const daysSinceStart = Math.ceil((now.getTime() - effectiveStartDate.getTime()) / (1000 * 60 * 60 * 24));
      
      totalPossible += daysSinceStart;
    });
    
    return {
      completions: totalCompletions,
      possible: totalPossible,
      rate: totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0
    };
  };
  
  const timeframeStats = calculateTimeframeStats();
  
  // Generate data for chart
  const generateChartData = () => {
    const now = new Date();
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Count completions for this date
      const completionsOnDate = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;
      
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      data.push(completionsOnDate);
    }
    
    return { labels, data };
  };
  
  const chartData = generateChartData();
  
  // Find the highest value for scaling the chart
  const maxValue = Math.max(...chartData.data, 1);
  
  return (
    <div className="pb-20">
      <PageHeader title="Statistics" />
      
      <div className="p-4">
        {/* Timeframe Selector */}
        <div className="flex justify-between mb-4 bg-white rounded-lg shadow-md p-2">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'week' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedTimeframe('week')}
          >
            Week
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'month' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedTimeframe('month')}
          >
            Month
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'year' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedTimeframe('year')}
          >
            Year
          </button>
        </div>
        
        {/* Overall Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Overview</h2>
            <span className="text-sm text-gray-500">
              {formatDateForDisplay(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())} - {formatDateForDisplay(new Date().toISOString())}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold">{timeframeStats.rate}%</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Activity size={20} className="text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-green-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Completions</p>
                  <p className="text-2xl font-bold">{timeframeStats.completions}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Award size={20} className="text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-purple-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Best Streak</p>
                  <p className="text-2xl font-bold">{user.streakCount} days</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Medal size={20} className="text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-orange-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Habits</p>
                  <p className="text-2xl font-bold">{habits.length}</p>
                </div>
                <div className="bg-orange-100 p-2 rounded-full">
                  <Calendar size={20} className="text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weekly Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Last 7 Days Activity</h2>
          
          <div className="flex items-end justify-between h-40 mb-2">
            {chartData.data.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-6 bg-blue-500 rounded-t-md transition-all duration-500"
                  style={{ 
                    height: `${value > 0 ? (value / maxValue) * 100 : 0}%`,
                    minHeight: value > 0 ? '10%' : '0'
                  }}
                ></div>
                <span className="text-xs mt-1">{chartData.labels[index]}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Habits */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Top Habits</h2>
          
          {topHabits.length > 0 ? (
            topHabits.map((habit, index) => {
              const completionRate = habit.completedDates.length > 0 
                ? Math.round((habit.completedDates.length / (new Date().getTime() - new Date(habit.createdAt).getTime()) * (1000 * 60 * 60 * 24)) * 100)
                : 0;
                
              return (
                <div 
                  key={habit.id} 
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-center">
                    <div 
                      className="flex items-center justify-center w-8 h-8 rounded-full mr-3 text-white font-medium text-sm"
                      style={{ backgroundColor: habit.color }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{habit.title}</h3>
                      <p className="text-xs text-gray-500">{habit.completedDates.length} completions</p>
                    </div>
                  </div>
                  
                  <div className="w-16 text-right">
                    <p className="font-semibold">{Math.min(100, completionRate)}%</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-4">No habits to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;