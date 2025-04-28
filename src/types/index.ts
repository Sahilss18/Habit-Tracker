export interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  frequency: 'daily' | 'weekly';
  timeOfDay?: string;
  createdAt: string;
  completedDates: string[]; // ISO date strings
  streakCount: number;
  reminderEnabled: boolean;
  reminderTime?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  streakCount: number;
  completionRate: number;
}