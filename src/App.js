import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import { taskList, errorMessages } from './data'
import './App.css'

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDriver, setCurrentDriver] = useState(1)
  const [scheduleInterval, setScheduleInterval] = useState(2)
  const [driverSchedule, setDriverSchedule] = useState([])
  const [fullSchedule, setFullSchedule] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentTask, setCurrentTask] = useState()

  const refreshDriverSchedule = () => {
    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
  }

  const handleError = error => {
    setErrorModalVisible(true)
    setErrorMessage(errorMessages[error])
  }

  const toggleModalVisibility = type => {
    let visibility
    switch (type) {
      case "CREATE":
        editModalVisible && setEditModalVisible(false)
        visibility = createModalVisible
        setCreateModalVisible(!visibility)
        break
      case "EDIT":
        createModalVisible && setCreateModalVisible(false)
        visibility = editModalVisible
        setEditModalVisible(!visibility)
        break
      case "ERROR":
        visibility = errorModalVisible
        setErrorModalVisible(!visibility)
        break
      default:
        break
    }
  }

  // task management functions in controller (app)
  const createTask = taskObject => {
    if (!taskConflict(taskObject)) {
      const schedule = fullSchedule
      // go ahead and create the object
      schedule.push(taskObject)
      setFullSchedule(schedule)
      refreshDriverSchedule()
      setCreateModalVisible(false)
      setCurrentTask()   
    } else {
      handleError("CREATE_CONFLICT")
    }
  }

  const getConflictArray = taskObject => {
    return fullSchedule.filter((scheduleItem) => (
      // matching week, day, driver_id then checking 
      // if either the start or end times are between an 
      // existing time in the schedule
      scheduleItem.week === taskObject.week
      && scheduleItem.day === taskObject.day
      && scheduleItem.driver_id === taskObject.driver_id
      && scheduleItem.start !== taskObject.end
      && scheduleItem.end !== taskObject.start
      && (
        (
          // return true if either start or end are equal on both
          parseInt(scheduleItem.start) === parseInt(taskObject.start)
        ) || 
        ( 
          parseInt(scheduleItem.end) === parseInt(taskObject.end)
        ) ||
        (
          // return true if the start is between
          parseInt(scheduleItem.start) < parseInt(taskObject.end)
          && parseInt(scheduleItem.end) > parseInt(taskObject.start)
        )
      )
    ))
  }

  const taskConflict = taskObject => {
    let conflict = getConflictArray(taskObject)
    conflict = conflict.filter(item => item !== currentTask)
    return conflict.length > 0 ? true : false
  }

  const updateTask = (taskObject, overwrite = false) => {
    // we want to compare with the current task item removed since we know there's a conflict there
    if (taskObject.start >= taskObject.end) {
      handleError('INVALID_TIME')
      return
    }
    if (!taskConflict(taskObject) || overwrite) {
      // assign again here, since we want to replace the item in the full schedule
      const index = fullSchedule.indexOf(currentTask)
      let schedule = fullSchedule
      schedule.splice(index, 1, taskObject)
      setFullSchedule(schedule)
      refreshDriverSchedule()
      setEditModalVisible(false)
      setCurrentTask()
    } else {
      handleError("UPDATE_CONFLICT")
    }
  }

  const deleteTask = () => {
    const index = fullSchedule.indexOf(currentTask)
    let schedule = fullSchedule
    schedule.splice(index, 1)
    setFullSchedule(schedule)
    refreshDriverSchedule()
    setEditModalVisible(false)
    setCurrentTask()
  }

  const overwriteTask = (taskObject, edit=false) => {
    const conflict = getConflictArray(taskObject).filter(item => item !== currentTask)
    const index = fullSchedule.indexOf(conflict[0])
    let schedule = fullSchedule
    schedule.splice(index, 1, taskObject)
    const taskObjectIndex = fullSchedule.indexOf(currentTask)
    edit && schedule.splice(taskObjectIndex, 1)
    setFullSchedule(schedule)
    refreshDriverSchedule()
    setEditModalVisible(false)
    setCurrentTask()    
  }

  useEffect(() => {
    if (fullSchedule.length === 0) {
      setFullSchedule(taskList)
    }

    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
  }, [currentDriver, setDriverSchedule, fullSchedule])

  return (
    <div className="App">
    {(createModalVisible || editModalVisible || errorModalVisible) || (
      <Header 
        week={currentWeek}
        scheduleInterval={scheduleInterval}
        driverSchedule={driverSchedule}
        updateWeek={setCurrentWeek}
        updateDriver={setCurrentDriver}
        updateScheduleInterval={setScheduleInterval}
        currentDriver={currentDriver} 
      />
    )}

      <Schedule 
        driverSchedule={driverSchedule} 
        week={currentWeek}
        toggleModal={toggleModalVisibility}
        createModalVisible={createModalVisible}
        editModalVisible={editModalVisible}
        errorModalVisible={errorModalVisible}
        currentDriver={currentDriver}
        currentTask={currentTask}
        createTask={createTask}
        updateTask={updateTask}
        updateCurrentTask={setCurrentTask}
        deleteTask={deleteTask}
        overwriteTask={overwriteTask}
        errorMessage={errorMessage} 
      />
    </div>
  )
}

export default App
