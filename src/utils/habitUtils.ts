export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  // Sort dates in ascending order
  const sortedDates = [...completedDates].sort();
  
  // Get current date without time
  const today = new Date().toISOString().split('T')[0];
  
  // Check if today or yesterday is completed
  const isRecentlyCompleted = sortedDates.includes(today);
  
  // If not completed today or yesterday, streak is broken
  if (!isRecentlyCompleted) return 0;
  
  // Count consecutive days
  let streak = 1;
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const currentDate = new Date(sortedDates[i]);
    const prevDate = new Date(sortedDates[i - 1]);
    
    // Calculate the difference in days
    const diffTime = currentDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // If days are consecutive, increase streak
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getCompletionRate = (completedDates: string[], startDate: string): number => {
  const start = new Date(startDate);
  const now = new Date();
  const daysSinceStart = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  // Ensure we don't divide by zero
  if (daysSinceStart <= 0) return 0;
  
  const completionRate = (completedDates.length / daysSinceStart) * 100;
  return Math.min(100, Math.round(completionRate));
};

export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Health': '#3B82F6',
    'Fitness': '#10B981',
    'Education': '#8B5CF6',
    'Mindfulness': '#EC4899',
    'Productivity': '#F59E0B',
    'Finance': '#6366F1',
    'Social': '#F97316',
    'Creativity': '#06B6D4'
  };
  
  return colorMap[category] || '#64748B';
};