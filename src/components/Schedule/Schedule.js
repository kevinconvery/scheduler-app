import React from 'react'
import { scheduleTimes, weekdays, gridCoordinates } from '../../data'
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
              <li key={scheduleTimes.indexOf(time)}>{time}</li>
            ))}
          </ul>
        </div>
        <div className="schedule-grid">
          {gridCoordinates.map(coordinate => {
            const { day, time } = coordinate
            return (
              <div className="cell" key={`D${day}T${time}`}>
                {scheduleTimes[time]}, {weekdays[day]}
              </div>
          )})}
        </div>
      </div>
    </div>
  )
}
      
export default Schedule
      

      