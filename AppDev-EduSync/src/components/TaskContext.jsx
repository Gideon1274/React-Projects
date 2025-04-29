import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish Math Assignment', priority: 'High', due: '2025-04-30', completed: false, category: 'Study', notes: '', progress: 50 },
    { id: 2, text: 'Read Chapter 5', priority: 'Medium', due: '2025-04-29', completed: false, category: 'Study', notes: 'Focus on key concepts', progress: 20 },
    { id: 3, text: 'Prepare for Quiz', priority: 'Low', due: '2025-05-01', completed: true, category: 'Study', notes: '', progress: 100 },
    { id: 4, text: 'Team Meeting', priority: 'High', due: '2025-04-29', completed: false, category: 'Work', notes: 'Discuss project timeline', progress: 0 },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
