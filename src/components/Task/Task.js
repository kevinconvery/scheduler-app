import React from 'react'
import './Task.css'

const Task = props => {
  const { type, length, taskID, editTask } = props

  return (
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
  )
}

export default Task