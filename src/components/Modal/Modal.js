import React, { useState, useEffect } from 'react'
import { scheduleTimes, taskTypes, weekdays } from '../../data'
import './Modal.css'

const Modal = props => {
  const { modalType, toggleModalView } = props
  const [taskWeek, setTaskWeek] = useState()
  const [taskDay, setTaskDay] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [taskType, setTaskType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [driver, setDriver] = useState()

  const handleSubmit = e => {
    e.preventDefault()

  }

  {return modalType === 'CREATE' ? ( 
    <div className="Modal">
      <h3>CREATE ITEM MODAL VIEW</h3>
      <form
        className="create-item-form" 
        onSubmit={handleSubmit}
      >
        <div class="form-field">
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
        <div class="form-field">
          <label htmlFor="end-time">End Time:</label>
          <select 
            name="end-time"
            onChange={e => setEndTime(e.target.value)}
            value={endTime}
          >
            <option
              key="default-end-time"
              value="" 
              selected
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
        <div class="form-field">
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
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-location">
            Where is the driver going?
          </label>
          <input
            type="text"
            className="text-location-field"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="form-field">
          
        </div>
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
  )}
}

export default Modal