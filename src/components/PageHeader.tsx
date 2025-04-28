import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  showBackButton = false,
  rightAction
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 z-10">
      <div className="glass px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-xl font-bold gradient-text">{title}</h1>
        </div>
        
        {rightAction && (
          <div className="flex items-center">{rightAction}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;