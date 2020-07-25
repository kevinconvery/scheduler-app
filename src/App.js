import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import { taskList } from './data'

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDriver, setCurrentDriver] = useState(0)
  const [scheduleInterval, setScheduleInterval] = useState(0)
  const [driverSchedule, setDriverSchedule] = useState([])

  useEffect(() => {
    setDriverSchedule(
      taskList.filter(task => (
        task.driver_id === currentDriver
      ))
    )
  }, [currentDriver, setDriverSchedule])

  return (
    <div className="App">
      <Header 
        week={currentWeek}
        updateWeek={setCurrentWeek}
        updateDriver={setCurrentDriver}
        updateScheduleInterval={setScheduleInterval} 
      />
      <Schedule driverSchedule={driverSchedule} week={currentWeek} />
    </div>
  )
}

export default App
