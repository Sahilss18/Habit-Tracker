import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { Search, Filter } from 'lucide-react';

const HabitList: React.FC = () => {
  const { habits } = useHabits();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const today = new Date().toISOString().split('T')[0];
  
  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isCompletedToday = habit.completedDates.includes(today);
    
    if (filter === 'active') {
      return matchesSearch && !isCompletedToday;
    } else if (filter === 'completed') {
      return matchesSearch && isCompletedToday;
    }
    
    return matchesSearch;
  });
  
  const handleCategorySelect = (category: string) => {
    setSearchTerm(category);
  };
  
  // Get unique categories from habits
  const categories = Array.from(new Set(habits.map(habit => habit.category)));
  
  return (
    <div className="pb-20">
      <PageHeader title="My Habits" />
      
      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search habits..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'completed' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 whitespace-nowrap"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Habit List */}
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => (
            <HabitCard key={habit.id} habit={habit} />
          ))
        ) : (
          <EmptyState 
            message={searchTerm 
              ? "No habits match your search" 
              : "You haven't created any habits yet"}
            actionText={searchTerm 
              ? "Clear Search" 
              : "Create Your First Habit"}
            actionPath={searchTerm ? "/habits" : "/add-habit"}
            icon={<Filter size={48} />}
          />
        )}
      </div>
    </div>
  );
};

export default HabitList;