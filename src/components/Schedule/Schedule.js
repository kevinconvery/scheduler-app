import React from 'react'
import { scheduleTimes } from '../../data'
import './Schedule.css'

const Schedule = props => {
  const { driverSchedule } = props
  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

  return (
    <div className="Schedule">
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
  )
}

export default Schedule

