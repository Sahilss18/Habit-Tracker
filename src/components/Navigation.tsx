import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, BarChart2, UserCircle, Plus } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="max-w-md mx-auto">
        <div className="glass mx-4 mb-4 rounded-2xl shadow-soft">
          <div className="flex justify-around items-center p-2">
            <Link 
              to="/" 
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Home size={22} />
              <span className="text-xs mt-1 font-medium">Home</span>
            </Link>
            
            <Link 
              to="/habits" 
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive('/habits') 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List size={22} />
              <span className="text-xs mt-1 font-medium">Habits</span>
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="flex flex-col items-center p-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg -mt-8 transform transition-transform hover:scale-105"
              >
                <Plus size={24} />
              </button>
              
              {isAddMenuOpen && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 glass rounded-xl shadow-soft p-2 w-48 animate-fade-in">
                  <Link 
                    to="/add-habit" 
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsAddMenuOpen(false)}
                  >
                    Add New Habit
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/stats" 
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive('/stats') 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <BarChart2 size={22} />
              <span className="text-xs mt-1 font-medium">Stats</span>
            </Link>
            
            <Link 
              to="/profile" 
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive('/profile') 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <UserCircle size={22} />
              <span className="text-xs mt-1 font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;