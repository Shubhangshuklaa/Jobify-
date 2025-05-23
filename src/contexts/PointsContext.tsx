
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Task {
  id: string;
  name: string;
  points: number;
  description: string;
  completed: boolean;
  type: 'daily' | 'one-time' | 'repeatable';
}

interface PointsContextType {
  totalPoints: number;
  rank: number;
  tasks: Task[];
  completeTask: (taskId: string) => void;
  addPoints: (points: number, reason: string) => void;
  pointsHistory: Array<{ points: number; reason: string; timestamp: Date }>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(850); // Starting with some points for demo
  const [rank, setRank] = useState(42);
  const [pointsHistory, setPointsHistory] = useState<Array<{ points: number; reason: string; timestamp: Date }>>([
    { points: 50, reason: 'Profile completed', timestamp: new Date(Date.now() - 86400000) },
    { points: 20, reason: 'Resume uploaded', timestamp: new Date(Date.now() - 172800000) },
    { points: 10, reason: 'Daily sign-in', timestamp: new Date() }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Daily Sign-In',
      points: 10,
      description: 'Check in once per day',
      completed: true,
      type: 'daily'
    },
    {
      id: '2',
      name: 'Complete Profile',
      points: 50,
      description: 'Fill out all profile fields',
      completed: true,
      type: 'one-time'
    },
    {
      id: '3',
      name: 'Upload Resume',
      points: 20,
      description: 'Add or update resume PDF',
      completed: true,
      type: 'one-time'
    },
    {
      id: '4',
      name: 'Apply for a Job',
      points: 5,
      description: 'Click "Apply" on a job listing',
      completed: false,
      type: 'repeatable'
    },
    {
      id: '5',
      name: 'Refer a Peer',
      points: 200,
      description: 'Unique referral link generates points on signup',
      completed: false,
      type: 'repeatable'
    }
  ]);

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        const newHistory = {
          points: task.points,
          reason: task.name,
          timestamp: new Date()
        };
        setPointsHistory(prev => [newHistory, ...prev]);
        setTotalPoints(prev => prev + task.points);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const addPoints = (points: number, reason: string) => {
    setTotalPoints(prev => prev + points);
    const newHistory = {
      points,
      reason,
      timestamp: new Date()
    };
    setPointsHistory(prev => [newHistory, ...prev]);
  };

  return (
    <PointsContext.Provider value={{
      totalPoints,
      rank,
      tasks,
      completeTask,
      addPoints,
      pointsHistory
    }}>
      {children}
    </PointsContext.Provider>
  );
};
