import React from 'react'
import './Task.css'

const Task = props => {
  const { type, length, taskID, createTask, editTask, empty, position } = props
  const { week, hour, day } = position || { week: 1, hour: 0, day: 0 }
  return !empty ? (
    <div 
      className={`Task task-${type.toLowerCase()}`}
      style={{
        height: `${50 * parseInt(length)}px`
      }}
      onClick={() => editTask(taskID)}
      name={`task-${taskID}`}
    >
      {type.toUpperCase()}
    </div>
  ) : (
    <div 
      className={`cell-w${week}-d${day}-h${hour} grid-cell`} 
      onClick={() => createTask({week: week, day: day, hour: hour})}
    >
    </div>
  )
}

export default Task