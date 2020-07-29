import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
// dummy data
import { taskList, testTasks } from './data'
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
    switch (error) {
      case `CREATE_CONFLICT`:
        setErrorMessage(`
          Creating this task would cause it to conflict with another task. Would you
          like to overwrite the existing task?
        `)
        break
      case `UPDATE_CONFLICT`:
        setErrorMessage(
          `Updating this task would cause it to conflict with another task. Would you like 
          to delete the previous task you had booked?`)
        break
      case `INVALID_TIME`:
        setErrorMessage(
          `You cannot book or update an appointment with a start time after the end time.`
        )
        break
      default:
        break
    }
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
    console.log(`value of task object: ${JSON.stringify(taskObject, null, 4)}`)
    if (!taskConflict(taskObject)) {
      const schedule = fullSchedule
      // go ahead and create the object
      schedule.push(taskObject)
      setFullSchedule(schedule)
      refreshDriverSchedule()
      setCreateModalVisible(false)   
    } else {
      handleError("CREATE_CONFLICT")
    }
  }

  const getConflictArray = taskObject => {
    console.log(`Value of task object in getConflictArray: ${JSON.stringify(taskObject, null, 4)}`)
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
    console.log(`Conflict array: ${JSON.stringify(conflict, null, 4)}`)
    console.log(`Conflict length: ${conflict.length}`)
    return conflict.length > 0 ? true : false
  }

  const updateTask = (taskObject, overwrite = false) => {
    // we want to compare with the current task item removed since we know there's a conflict there
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
    // console.log(`value of taskObject: ${JSON.stringify(taskObject, null, 4)}`)
    const conflict = getConflictArray(taskObject)
    // console.log(`Conflicting item with the task object: ${JSON.stringify(conflict[0], null, 4)}`)
    const index = fullSchedule.indexOf(conflict[0])
    // console.log(`value of index in full schedule: ${index}`)
    // console.log(`conflict array in delete task: ${JSON.stringify(conflict, null, 4)}`)
    // console.log(`index of first item in array: ${index}`)
    // console.log(`item to be deleted: ${JSON.stringify(fullSchedule[index])}`)
    // console.log(`value of task object: ${JSON.stringify(taskObject, null, 4)}`)
    // console.log(`index of task object: ${taskObjectIndex}`)
    let schedule = fullSchedule
    schedule.splice(index, 1, taskObject)
    // console.log(`value of current task: ${JSON.stringify(currentTask)}`)
    const taskObjectIndex = fullSchedule.indexOf(currentTask || conflict[0])
    // console.log(`Value of task object index: ${taskObjectIndex}`)
    schedule.splice(taskObjectIndex, 1)
    edit || schedule.push(taskObject)
    setFullSchedule(schedule)
    refreshDriverSchedule()
    setEditModalVisible(false)
    setCurrentTask()    
  }

  useEffect(() => {
    if (fullSchedule.length === 0) {
      setFullSchedule(testTasks)
    }

    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
  }, [currentDriver, setDriverSchedule, fullSchedule])

  return (
    <div className="App">
      <Header 
        week={currentWeek}
        scheduleInterval={scheduleInterval}
        driverSchedule={driverSchedule}
        updateWeek={setCurrentWeek}
        updateDriver={setCurrentDriver}
        updateScheduleInterval={setScheduleInterval}
        currentDriver={currentDriver} 
      />

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
