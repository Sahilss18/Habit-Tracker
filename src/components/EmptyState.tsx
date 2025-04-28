import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  actionText: string;
  actionPath: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  actionText, 
  actionPath,
  icon
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-4 text-gray-400">
        {icon || <PlusCircle size={48} />}
      </div>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={() => navigate(actionPath)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {actionText}
      </button>
    </div>
  );
};

export default EmptyState;