import React, { useRef } from 'react';
import { useHabits } from '../context/HabitContext';
import PageHeader from '../components/PageHeader';
import { formatDateForDisplay } from '../utils/habitUtils';
import { Award, Settings, Bell, Calendar, Shield, Users, HelpCircle, LogOut, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, habits, updateUser } = useHabits();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate additional stats
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length, 0
  );
  
  const joinDate = new Date(user.joinedDate);
  const now = new Date();
  const daysSinceJoined = Math.ceil((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const avgCompletionsPerDay = daysSinceJoined > 0 
    ? (totalCompletions / daysSinceJoined).toFixed(1) 
    : '0';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateUser({ avatar: imageUrl });
    }
  };
  
  return (
    <div className="pb-20">
      <PageHeader 
        title="Profile" 
        rightAction={
          <button className="p-2 text-gray-500">
            <Settings size={20} />
          </button>
        }
      />
      
      <div className="p-4">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Change profile picture"
              >
                <Camera size={14} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Joined {formatDateForDisplay(user.joinedDate)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-2xl font-bold">{user.streakCount} days</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <Award size={20} className="text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Completion</p>
                <p className="text-2xl font-bold">{user.completionRate}%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar size={20} className="text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Habits</p>
                <p className="text-2xl font-bold">{habits.length}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield size={20} className="text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Daily Avg</p>
                <p className="text-2xl font-bold">{avgCompletionsPerDay}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users size={20} className="text-purple-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings & Support */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>
          
          <div>
            <a className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Bell size={20} className="text-gray-500 mr-3" />
                <span>Notifications</span>
              </div>
              <span className="text-blue-500">On</span>
            </a>
            
            <a className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Shield size={20} className="text-gray-500 mr-3" />
                <span>Privacy</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            
            <a className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <HelpCircle size={20} className="text-gray-500 mr-3" />
                <span>Help & Support</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            
            <a className="flex items-center justify-between p-4 hover:bg-gray-50 text-red-500">
              <div className="flex items-center">
                <LogOut size={20} className="mr-3" />
                <span>Log Out</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;