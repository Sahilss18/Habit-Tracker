import { Habit } from '../types';

export const generateSampleHabits = (): Habit[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];
  
  return [
    {
      id: '1',
      title: 'Drink Water',
      description: 'Drink 8 glasses of water daily',
      category: 'Health',
      color: '#3B82F6', // blue
      frequency: 'daily',
      timeOfDay: 'Throughout the day',
      createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      completedDates: [
        formatDate(twoDaysAgo),
        formatDate(yesterday),
        formatDate(today)
      ],
      streakCount: 3,
      reminderEnabled: true,
      reminderTime: '09:00'
    },
    {
      id: '2',
      title: 'Exercise',
      description: 'Do a 30-minute workout',
      category: 'Fitness',
      color: '#10B981', // green
      frequency: 'daily',
      timeOfDay: 'Morning',
      createdAt: new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      completedDates: [
        formatDate(twoDaysAgo),
        formatDate(yesterday)
      ],
      streakCount: 2,
      reminderEnabled: true,
      reminderTime: '07:00'
    },
    {
      id: '3',
      title: 'Read',
      description: 'Read for 20 minutes',
      category: 'Education',
      color: '#8B5CF6', // purple
      frequency: 'daily',
      timeOfDay: 'Evening',
      createdAt: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      completedDates: [
        formatDate(yesterday)
      ],
      streakCount: 1,
      reminderEnabled: false
    },
    {
      id: '4',
      title: 'Meditate',
      description: 'Meditate for 10 minutes',
      category: 'Mindfulness',
      color: '#EC4899', // pink
      frequency: 'daily',
      timeOfDay: 'Morning',
      createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completedDates: [],
      streakCount: 0,
      reminderEnabled: true,
      reminderTime: '06:30'
    }
  ];
};