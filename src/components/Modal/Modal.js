import React, { useState } from 'react'
import { scheduleTimes, taskTypes, weekdays, drivers } from '../../data'
import './Modal.css'

const Modal = props => {
  const { modalType, toggleModalView, createTask, updateTask, deleteTask } = props
  const [taskWeek, setTaskWeek] = useState(1)
  const [taskDay, setTaskDay] = useState(0)
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [taskType, setTaskType] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskLocation, setTaskLocation] = useState("")
  const [driver, setDriver] = useState(1)

  const handleSubmit = e => {
    e.preventDefault()
    const newTask = {
      day: parseInt(taskDay),
      week: parseInt(taskWeek),
      driver_id: parseInt(driver),
      start: parseInt(startTime),
      end: parseInt(endTime),
      type: taskType,
      description: taskDescription,
      location: taskLocation
    }

    createTask(newTask)
  }

  return modalType === 'CREATE' ? ( 
    <div className="Modal">
      <h3>CREATE ITEM MODAL VIEW</h3>
      <form
        className="create-item-form" 
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <label htmlFor="driver">Driver:</label>
          <select 
            name="driver"
            onChange={e => setDriver(e.target.value)}
            value={driver}
          >
            <option value="">-- Select a driver --</option>
            {drivers.map(driver => (
              <option key={driver} value={drivers.indexOf(driver) + 1}>{driver}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
        <label htmlFor="week">Week of task:</label>
          <select 
            name="week"
            onChange={e => setTaskWeek(e.target.value)}
            value={taskWeek}
          >
            {Array(52)
              .fill()
              .map((key, value) => (
                <option 
                  key={`week-${value}`} 
                  value={(value + 1)}
                >
                  {value + 1}
                </option>
              ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="task-day">Day of task:</label>
          <select 
            name="task-day"
            value={taskDay}
            onChange={e => setTaskDay(e.target.value)}
          >
            {weekdays.map(weekday => (
              <option value={weekdays.indexOf(weekday)} key={weekday}>{weekday}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="start-time">Start Time:</label>
          <select 
            name="start-time"
            onChange={e => setStartTime(e.target.value)}
            value={startTime}  
          >
            <option value="">-- Select a start time --</option>
            {scheduleTimes
              .map(time => (
                <option
                  key={`start-time-${time}`} 
                  name={time} 
                  value={scheduleTimes.indexOf(time)}
                >
                  {scheduleTimes[scheduleTimes.indexOf(time)]}
                </option>
              )
            )}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="end-time">End Time:</label>
          <select 
            name="end-time"
            onChange={e => setEndTime(e.target.value)}
            value={endTime}
          >
            <option
              key="default-end-time"
              value="" 
              defaultValue
            >
              -- Select an ending time --
            </option>
            {scheduleTimes
              .map(time => (
                <option
                  key={`end-time-${time}`}
                  name={time}
                  value={scheduleTimes.indexOf(time)}
                >
                  {scheduleTimes[scheduleTimes.indexOf(time)]}
                </option>              
              )
            )}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="task-type">What type of task is this?</label>
          <select 
            name="task-type"
            onChange={e => setTaskType(e.target.value)}
            value={taskType}
          >
            <option 
              key="default-task-type"
              name="default-task-type"
              value=""
            >
              -- Select a task type --
            </option>
            {taskTypes.map(type => (
              <option 
                key={`task-type-${type}`}
                name={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select> 
        </div>
        <div className="form-field">
          <label htmlFor="task-description">
            Please describe the task briefly:
          </label>
          <input 
            type="text"
            className="text-description-field"
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-location">
            Where is the driver going?
          </label>
          <input
            type="text"
            className="text-location-field"
            value={taskLocation}
            onChange={e => setTaskLocation(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          className="create-task-button"
        >
          Create Task
        </button>
      </form>
      <button
        className="toggle-modal-view-button"
        onClick={() => toggleModalView("CREATE")}
      >
        Toggle View
      </button>
    </div>
  ) : (
    <div className="Modal">
      <button
        className="toggle-modal-view-button" 
        onClick={() => toggleModalView("EDIT")}
      >
        Toggle View</button>
    </div>    
  )
}

export default Modal