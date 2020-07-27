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
  const [currentTask, setCurrentTask] = useState()

  const toggleModalVisibility = (type) => {
    let visibility
    switch (type) {
      case "CREATE":
        editModalVisible && (setEditModalVisible(false))
        visibility = createModalVisible
        setCreateModalVisible(!visibility)
        break
      case "EDIT":
        createModalVisible && (setCreateModalVisible(false))
        visibility = editModalVisible
        setEditModalVisible(!visibility)
        break
      default:
        break
    }
  }

  // task management functions in controller (app)
  const createTask = taskObject => {
    console.log(`value of task object: ${taskObject}`)
    const schedule = fullSchedule
    schedule.push(taskObject)
    setFullSchedule(schedule)
    setDriverSchedule(
      fullSchedule.filter(task => (
        task.driver_id === currentDriver
      ))
    )
    setCreateModalVisible(false)   
  }

  // will return a boolean result if there is a conflict
  // a conflict is defined as same driver, day, week and:
  // todo
  const taskConflict = taskObject => {
    const conflict = fullSchedule.filter((item) => (
      item.week === taskObject.week
      && item.day === taskObject.day
      && item.driver_id === taskObject.driver_id
    ))
    return conflict.length > 0
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
    console.log('clickin delete!!')
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
        currentTask={currentTask}
        createTask={createTask}
        updateTask={updateTask}
        updateCurrentTask={setCurrentTask}
        deleteTask={deleteTask} 
      />
    </div>
  )
}

export default App
