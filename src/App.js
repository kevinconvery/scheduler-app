import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
// dummy data
import { taskList, testTasks } from './data'
import './App.css'

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDriver, setCurrentDriver] = useState(1)
  const [scheduleInterval, setScheduleInterval] = useState(0)
  const [driverSchedule, setDriverSchedule] = useState([])
  const [fullSchedule, setFullSchedule] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTask, setCurrentTask] = useState()

  const toggleModalVisibility = (type) => {
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
    const schedule = fullSchedule
    if (!taskConflict(taskObject)) {
      // go ahead and create the object
      schedule.push(taskObject)
      setFullSchedule(schedule)
      setDriverSchedule(
        fullSchedule.filter(task => (
          task.driver_id === currentDriver
        ))
      )
      setCreateModalVisible(false)   
    } else {
      setErrorModalVisible(true)
      setErrorMessage("This would conflict with another task. Are you sure you'd like to overwrite this?")
    }
  }

  // will return a boolean result if there is a conflict
  // a conflict is defined as same driver, day, week and:
  // todo
  const taskConflict = taskObject => {
    const conflict = fullSchedule.filter((item) => (
      item.week === taskObject.week
      && item.day === taskObject.day
      && item.driver_id === taskObject.driver_id
      && (
        (
          parseInt(item.start) >= parseInt(taskObject.start) 
          && parseInt(item.start) <= parseInt(taskObject.end)
        ) || (
          parseInt(item.end) >= parseInt(taskObject.start)
          && parseInt(item.end) <= parseInt(taskObject.end)
        )
      )
    ))
    console.log(`length of conflict array: ${conflict.length}`)
    if (conflict.length > 0) {
      // console.log(`CONFLICT:`)
      // console.log(`Object found in full schedule: ${JSON.stringify(conflict[0], null, 4)}`)
      // console.log(`New object being updated or created: ${JSON.stringify(taskObject, null, 4)}`)
      return true
    } else {
      return false
    }
  }

  const updateTask = taskObject => {
    const index = fullSchedule.indexOf(currentTask)
    let schedule = fullSchedule
    schedule.splice(index, 1, taskObject)
    setFullSchedule(schedule)
    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
    setEditModalVisible(false)
    setCurrentTask()
  }

  const deleteTask = () => {
    const index = fullSchedule.indexOf(currentTask)
    let schedule = fullSchedule
    schedule.splice(index, 1)
    setFullSchedule(schedule)
    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
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
        currentTask={currentTask}
        createTask={createTask}
        updateTask={updateTask}
        updateCurrentTask={setCurrentTask}
        deleteTask={deleteTask}
        errorMessage={errorMessage} 
      />
    </div>
  )
}

export default App
