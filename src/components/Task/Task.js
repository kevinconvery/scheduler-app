import React from 'react'
import './Task.css'

const Task = props => {
  const { start, end, type, length, taskID } = props

  return (
    <div 
      className={`Task task-${type.toLowerCase()}`}
      style={{
        height: `${50 * parseInt(length)}px`
      }}
      onClick={() => console.log(`task of ${end - start} length clicked`)}
    >
      {type.toUpperCase()}
    </div>
  )
}

export default Task