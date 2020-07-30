import React from 'react'
import { scheduleTimes, weekdays } from '../../data'
import './Schedule.css'
import Task from '../Task/Task'
import CreateModal from '../Modal/CreateModal/CreateModal'
import EditModal from '../Modal/EditModal/EditModal'

const Schedule = props => {
  const { 
    driverSchedule, 
    week,
    toggleModal,
    createModalVisible,
    editModalVisible,
    errorModalVisible,
    errorMessage,
    createTask,
    updateTask,
    currentTask,
    updateCurrentTask,
    deleteTask,
    overwriteTask,
    currentDriver
  } = props

  const taskInSchedule = (week, day, hour) => {
    const taskArray = driverSchedule.filter(task => (
      task.week === week 
      && task.day === day 
      && (task.start === hour)
    ))

    const inSchedule = taskArray.length > 0

    const inBetween = driverSchedule.filter(task => (
      task.week === week 
      && task.day === day 
      && (task.start < hour && task.end > hour)
    )).length > 0

    // we want this omitted from the grid, anything between in the grid for the task
    if (inBetween) return

    if (inSchedule) {
      const { start, end, type, description, location } = taskArray[0]
      const taskID = driverSchedule.indexOf(taskArray[0])
      return (
        <Task
          taskID={taskID}
          key={`task-${taskID}`}
          start={start} 
          end={end} 
          type={type}
          description={description}
          location={location}
          length={end - start}
          editTask={findTaskAndEdit}
        />
      )  
    } else {
      const position = {day: day, week: week, hour: hour}
      return (
        <Task 
          empty
          key={`W${week}D${day}H${hour}`}
          position={position}
          createTask={createTaskWithPosition}
        />
      )
    }
  }

  const createTaskWithPosition = position => {
    const { day, week, hour } = position
    const task = {
      driver_id: currentDriver,
      day: parseInt(day),
      week: parseInt(week),
      start: parseInt(hour),
      end: parseInt(hour) + 1,
      type: 'Pickup',
      location: '',
      description: '',
    }
    updateCurrentTask(task)
    toggleModal("CREATE")
  }

  const findTaskAndEdit = id => {
    // find the task in the schedule:
    const task = driverSchedule[id]
    updateCurrentTask(task)
    toggleModal("EDIT")
  }

  return createModalVisible || editModalVisible ? (
    (createModalVisible ?
      <CreateModal 
        toggleModalView={toggleModal}
        createTask={createTask}
        errorModalVisible={errorModalVisible}
        errorMessage={errorMessage}
        overwriteTask={overwriteTask}
        currentTask={currentTask}
      />
    :     
      <EditModal 
        toggleModalView={toggleModal}
        createTask={createTask}
        currentTask={currentTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        errorModalVisible={errorModalVisible}
        errorMessage={errorMessage}
        overwriteTask={overwriteTask} 
      />
    )
  ) : (
    <div className="Schedule">
      <div className="container">
      <div className="schedule-header">
        <div className="header-left"></div>
          <ul>
            {weekdays.map(weekday => (
              <li key={weekday}>{weekday}</li>
            ))}
          </ul>
        </div>
        <div className="schedule-content-container">
          <div className="schedule-sidebar">
            <ul>
              {scheduleTimes.map(time => (
                <li key={scheduleTimes.indexOf(time)}>{time}</li>
              ))}
            </ul>
          </div>
          <div className="schedule-grid">
            {weekdays.map(weekday => (
              <div 
                className="grid-column"
                key={weekday}
              >
                {scheduleTimes.map(time => (
                  taskInSchedule(week, weekdays.indexOf(weekday), scheduleTimes.indexOf(time))
                ))}
              </div> 
            ))}
          </div>
        </div> 
      </div>
    </div>
  )
}
      
export default Schedule
      

      