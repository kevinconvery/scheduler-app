import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import { taskList } from './data'
import './App.css'

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDriver, setCurrentDriver] = useState(0)
  const [scheduleInterval, setScheduleInterval] = useState(0)
  const [driverSchedule, setDriverSchedule] = useState([])
  const [fullSchedule, setFullSchedule] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)

  const toggleModalVisibility = type => {
    let visibility
    switch (type) {
      case "CREATE":
        editModalVisible && (setEditModalVisible(false))
        visibility = createModalVisible
        console.log("create modal toggle fired")
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
  // const createTask = task => {

  // }

  // const updateTask = task_id => {

  // }

  // const deleteTask = task_id => {

  // }

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
      />

      <Schedule 
        driverSchedule={driverSchedule} 
        week={currentWeek}
        toggleModal={toggleModalVisibility}
        createModalVisible={createModalVisible}
        editModalVisible={editModalVisible} 
      />
    </div>
  )
}

export default App
