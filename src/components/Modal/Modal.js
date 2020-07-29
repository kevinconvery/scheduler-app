import React, { useState } from 'react'
import { scheduleTimes, taskTypes, weekdays, drivers } from '../../data'
import './Modal.css'

const Modal = props => {
  const { 
    modalType, 
    toggleModalView, 
    createTask, 
    updateTask, 
    deleteTask, 
    currentTask,
    errorModalVisible,
    errorMessage,
    overwriteTask
  } = props

  // state
  const [taskWeek, setTaskWeek] = useState(1)
  const [taskDay, setTaskDay] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(1)
  const [taskType, setTaskType] = useState("Pickup")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskLocation, setTaskLocation] = useState("")
  const [driver, setDriver] = useState(1)
  const [editTask, setEditTask] = useState({...currentTask})

  const buildTaskObjectFromState = () => {
    const taskObject = {
      day: parseInt(taskDay),
      week: parseInt(taskWeek),
      driver_id: parseInt(driver),
      start: parseInt(startTime),
      end: parseInt(endTime),
      type: taskType,
      description: taskDescription,
      location: taskLocation
    }

    return taskObject
  }

  const confirmCreateOverwrite = e => {
    e.preventDefault()
    toggleModalView("ERROR")
    toggleModalView("CREATE")
    overwriteTask(buildTaskObjectFromState())
  }

  const confirmUpdateOverwrite = e => {
    e.preventDefault()
    toggleModalView("ERROR")
    toggleModalView("EDIT")
    overwriteTask(editTask)
  }

  const handleCreateItemSubmit = e => {
    e.preventDefault()
    createTask(buildTaskObjectFromState())
  }

  const handleUpdateItemSubmit = e => {
    e.preventDefault()
    updateTask(editTask)
  }

  const handleDeleteTask = e => {
    e.preventDefault()
    deleteTask()
  }

  return modalType === 'CREATE' ? ( 
    <div className="Modal">
      <h3>CREATE ITEM MODAL VIEW</h3>
      <form
        className="create-item-form" 
        onSubmit={handleCreateItemSubmit}
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
            {scheduleTimes
              .slice(parseInt(startTime) + 1, scheduleTimes.length)
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
          className="modal-btn create-task-button"
        >
          Create Task
        </button>
        <button
          className="modal-btn toggle-modal-view-button"
          onClick={() => toggleModalView("CREATE")}
        >
          Toggle View
        </button>
      </form>
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
  ) : (
    <div className="Modal">
      <h3>EDIT/DELETE MODAL VIEW</h3>
      <form
        className="edit-item-form" 
        onSubmit={handleUpdateItemSubmit}
      >
        <div className="form-field">
          <label htmlFor="driver">Driver:</label>
          <select 
            name="driver"
            value={editTask.driver_id}
            onChange={e => setEditTask({...editTask, driver_id: parseInt(e.target.value)})}
          >
            {drivers.map(driver => (
              <option key={driver} value={drivers.indexOf(driver) + 1}>{driver}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="week">Week of task:</label>
          <select 
            name="week"
            value={editTask.week}
            onChange={e => setEditTask({...editTask, week: parseInt(e.target.value)})}
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
            value={editTask.day}
            onChange={e => setEditTask({...editTask, day: parseInt(e.target.value)})}
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
            value={editTask.start}  
            onChange={e => setEditTask({...editTask, start: parseInt(e.target.value)})}
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
            value={editTask.end}
            onChange={e => setEditTask({...editTask, end: parseInt(e.target.value)})}
          >
            {scheduleTimes
              .slice(editTask.end)
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
            value={editTask.type}
            onChange={e => setEditTask({...editTask, type: e.target.value})}
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
            value={editTask.description}
            onChange={e => setEditTask({...editTask, description: e.target.value})}
          />
        </div>
        <div className="form-field">
          <label htmlFor="task-location">
            Where is the driver going?
          </label>
          <input
            type="text"
            className="text-location-field"
            value={editTask.location}
            onChange={e => setEditTask({...editTask, location: e.target.value})}
          />
        </div>
        <button 
          type="submit"
          className="modal-btn update-task-button"
        >
          Update Task
        </button>
        <button
          className="modal-btn delete-task-button"
          onClick={e => handleDeleteTask(e)}>
          Delete Task
        </button>
      </form>
      {errorModalVisible && (
        <div className="error-modal">
          <div className="error-message">
            Error: {errorMessage}
          </div>
          <div className="button-section">
            <button 
              className="modal-btn confirm-overwrite-button"
              onClick={e => confirmUpdateOverwrite(e)}
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
      <button
        className="modal-btn toggle-modal-view-button" 
        onClick={() => toggleModalView("EDIT")}
      >
        Toggle View
      </button>
    </div>    
  )
}

export default Modal