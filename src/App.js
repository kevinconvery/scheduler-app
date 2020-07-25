import React, { useState } from 'react'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'

function App() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDriver, setCurrentDriver] = useState(0)
  const [scheduleInterval, setScheduleInterval] = useState(0)

  return (
    <div className="App">
      <Header 
        week={currentWeek}
        updateWeek={setCurrentWeek}
        updateDriver={setCurrentDriver}
        updateScheduleInterval={setScheduleInterval} 
      />
      <Schedule />
    </div>
  )
}

export default App
