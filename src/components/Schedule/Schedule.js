import React from 'react'
import { scheduleTimes, weekdays } from '../../data'
import './Schedule.css'
import Task from '../Task/Task'

const Schedule = props => {
  const { driverSchedule, week } = props

  const taskInSchedule = (week, day, hour) => {
    const testArray = driverSchedule.filter(task => (
      task.week === week 
      && task.day === day 
      && (task.start === hour)
    ))

    const between = driverSchedule.filter(task => (
      task.week === week && task.day === day && (task.start < hour && task.end > hour
    )))

    if (between.length > 0) return

    if (testArray.length > 0) {
      const { start, end, type } = testArray[0]
      return (
        <Task 
          start={start} 
          end={end} 
          type={type}
          length={end - start}
        />
      )  
    } else {
      return (
        <div 
          className={`cell-w${week}-d${day}-h${hour} grid-cell`} 
          key={`W${week}D${day}H${hour}`}
        >
        </div>
      )
    }
  }

  return (
    <div className="Schedule">
      <div className="container">
        <div className="schedule-header">
          <ul>
            {weekdays.map(weekday => (
              <li key={weekday}>{weekday}</li>
            ))}
          </ul>
        </div>
        <div className="schedule-content-container">
          <div className="schedule-sidebar">
            <ul>
              {scheduleTimes.map(time => (
                <li key={scheduleTimes.indexOf(time)}>{time}</li>
              ))}
            </ul>
          </div>
          <div className="schedule-grid">
            {weekdays.map(weekday => (
              <div 
                className="grid-column"
                key={weekday}
              >
                {scheduleTimes.map(time => (
                  taskInSchedule(week, weekdays.indexOf(weekday), scheduleTimes.indexOf(time))
                ))}
              </div> 
            ))}
          </div>
        </div> 
      </div>
    </div>
  )
}
      
export default Schedule
      

      