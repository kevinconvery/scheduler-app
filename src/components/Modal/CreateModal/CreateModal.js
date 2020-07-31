import React, { useState } from 'react'
import { scheduleTimes, taskTypes, weekdays, drivers } from '../../../data'
import './CreateModal.css'

const CreateModal = props => {
  const { 
    toggleModalView, 
    createTask, 
    errorModalVisible,
    errorMessage,
    overwriteTask,
    currentTask
  } = props

  // state
  const [creationTask, setCreationTask] = useState({...currentTask})

  const confirmCreateOverwrite = e => {
    e.preventDefault()
    toggleModalView("ERROR")
    toggleModalView("CREATE")
    overwriteTask(creationTask)
  }

  const handleCreateItemSubmit = e => {
    e.preventDefault()
    createTask(creationTask)
  }

  return ( 
    <div className="CreateModal">
    {errorModalVisible || (
      <form
      className="create-item-form" 
      onSubmit={handleCreateItemSubmit}
      >
        <h3>CREATE NEW TASK</h3>
          <div className="form-field">
            <label htmlFor="driver">Driver:</label>
            <select 
              name="driver"
              value={creationTask.driver_id}
              onChange={e => setCreationTask({...creationTask, driver_id: parseInt(e.target.value)})}
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
              value={creationTask.week}
              onChange={e => setCreationTask({...creationTask, week: parseInt(e.target.value)})}
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
              value={creationTask.day}
              onChange={e => setCreationTask({...creationTask, day: parseInt(e.target.value)})}
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
              value={creationTask.start}  
              onChange={e => setCreationTask({...creationTask, start: parseInt(e.target.value)})}
            >
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
              onChange={e => setCreationTask({...creationTask, end: parseInt(e.target.value)})}
              value={creationTask.end}
            >
              {scheduleTimes
                .slice(creationTask.start + 1)
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
              onChange={e => setCreationTask({...creationTask, type: e.target.value })}
              value={creationTask.type}
            >
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
              value={creationTask.description}
              onChange={e => setCreationTask({...creationTask, description: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label htmlFor="task-location">
              Where is the driver going?
            </label>
            <input
              type="text"
              className="text-location-field"
              value={creationTask.location}
              onChange={e => setCreationTask({...creationTask, location: e.target.value })}
            />
          </div>
          {errorModalVisible || (
            <div className="modal-button-section">
              <button 
                type="submit"
                className="modal-btn create-task-button"
              >
                Create Task
              </button>
              <button
                className="modal-btn toggle-modal-view-button"
                onClick={() => toggleModalView("CREATE")}
              >
                Return to Schedule
              </button>
            </div>
          )}
        </form>
      )}
      {errorModalVisible && (
        <div className="error-modal">
          <div className="error-message">
            Error: {errorMessage}
          </div>
          <div className="button-section">
            <button 
              className="modal-btn confirm-overwrite-button"
              onClick={e => confirmCreateOverwrite(e)}
            >
              Confirm
            </button>
            <button 
              className="modal-btn toggle-modal-view-button"
              onClick={() => toggleModalView("ERROR")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  ) 
}

export default CreateModal