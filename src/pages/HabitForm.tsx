import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHabits } from '../context/HabitContext';
import PageHeader from '../components/PageHeader';
import { Clock, Bell } from 'lucide-react';

const colorOptions = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#F59E0B' }
];

const categoryOptions = [
  'Health',
  'Fitness',
  'Education',
  'Mindfulness',
  'Productivity',
  'Finance',
  'Social',
  'Creativity'
];

const HabitForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addHabit, updateHabit, getHabitById } = useHabits();
  
  const isEditMode = Boolean(id);
  const existingHabit = id ? getHabitById(id) : null;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Health',
    color: '#3B82F6',
    frequency: 'daily',
    timeOfDay: 'Any time',
    reminderEnabled: false,
    reminderTime: '09:00'
  });
  
  useEffect(() => {
    if (existingHabit) {
      setFormData({
        title: existingHabit.title,
        description: existingHabit.description,
        category: existingHabit.category,
        color: existingHabit.color,
        frequency: existingHabit.frequency,
        timeOfDay: existingHabit.timeOfDay || 'Any time',
        reminderEnabled: existingHabit.reminderEnabled,
        reminderTime: existingHabit.reminderTime || '09:00'
      });
    }
  }, [existingHabit]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && existingHabit) {
      updateHabit({
        ...existingHabit,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        color: formData.color,
        frequency: formData.frequency as 'daily' | 'weekly',
        timeOfDay: formData.timeOfDay,
        reminderEnabled: formData.reminderEnabled,
        reminderTime: formData.reminderTime
      });
      navigate(`/habit/${existingHabit.id}`);
    } else {
      addHabit({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        color: formData.color,
        frequency: formData.frequency as 'daily' | 'weekly',
        timeOfDay: formData.timeOfDay,
        reminderEnabled: formData.reminderEnabled,
        reminderTime: formData.reminderTime
      });
      navigate('/habits');
    }
  };
  
  return (
    <div className="pb-20">
      <PageHeader 
        title={isEditMode ? 'Edit Habit' : 'Create Habit'} 
        showBackButton={true} 
      />
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                Habit Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Drink Water"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Drink 8 glasses of water daily"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categoryOptions.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <div 
                    key={color.value}
                    onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${
                      formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="frequency">
                Frequency
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="frequency"
                    value="daily"
                    checked={formData.frequency === 'daily'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Daily</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="frequency"
                    value="weekly"
                    checked={formData.frequency === 'weekly'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Weekly</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="timeOfDay">
                Time of Day
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="timeOfDay"
                  name="timeOfDay"
                  value={formData.timeOfDay}
                  onChange={handleChange}
                  placeholder="Morning, Evening, etc."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700" htmlFor="reminderEnabled">
                  Reminder
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="reminderEnabled"
                    id="reminderEnabled"
                    checked={formData.reminderEnabled}
                    onChange={handleCheckboxChange}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="reminderEnabled" 
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      formData.reminderEnabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
              </div>
              
              {formData.reminderEnabled && (
                <div className="mt-3 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bell size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="reminderTime"
                    name="reminderTime"
                    value={formData.reminderTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isEditMode ? 'Update Habit' : 'Create Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;