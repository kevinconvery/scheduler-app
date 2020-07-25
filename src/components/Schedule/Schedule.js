import React from 'react'
import { scheduleTimes, weekdays, gridCoordinates } from '../../data'
import './Schedule.css'
import Task from '../Task/Task'

const Schedule = props => {
  const { driverSchedule, week } = props

  const taskInSchedule = (week, day, hour) => {
    const testArray = driverSchedule.filter(task => (
      task.week === week 
      && task.day === day 
      && (task.start <= hour && task.end >= hour)
    ))
    return testArray.length > 0
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
                className={`${weekday}-column grid-column`}
                key={weekday}
              >
                {scheduleTimes.map(time => (
                  <div 
                    className={`cell-${time}-${weekday} grid-cell`} 
                    key={`W${week}D${weekdays.indexOf(weekday)}T${scheduleTimes.indexOf(time)}`}
                    onClick={() => console.log(`day ${weekdays.indexOf(weekday)} time ${scheduleTimes.indexOf(time)} cell clicked`)}
                  >
                    {taskInSchedule(week, weekdays.indexOf(weekday), scheduleTimes.indexOf(time))
                      ? <Task />
                      : `W${week}D${weekdays.indexOf(weekday)}T${scheduleTimes.indexOf(time)}`
                    }
                  </div>
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
      

      