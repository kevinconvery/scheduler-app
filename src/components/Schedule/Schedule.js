import React from 'react'
import { scheduleTimes, weekdays } from '../../data'
import './Schedule.css'

const Schedule = props => {
  const { driverSchedule } = props


  return (
    <div className="Schedule">
      <div className="container">
        <div className="schedule-header">
          <ul>
            {weekdays.map(weekday => (
              <li>{weekday}</li>
            ))}
          </ul>
        </div>
        <div className="schedule-sidebar">
          <ul>
            {scheduleTimes.map(time => (
              <li key={time.key}>{time.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
      
      export default Schedule
      

      