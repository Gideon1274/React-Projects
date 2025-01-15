
import React from 'react';

const TaskList = ({ tasks, isPriority }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          Task Value: {task.value} {isPriority && '(High Priority)'}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
