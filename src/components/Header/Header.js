import React, { useState, useEffect } from 'react'
import './Header.css'
import { drivers } from '../../data'
import { CSVLink } from 'react-csv'

const Header = props => {
  const { 
    week,
    scheduleInterval, 
    updateDriver, 
    currentDriver, 
    updateWeek, 
    driverSchedule,
    updateScheduleInterval 
  } = props

  const [dataSet, setDataSet] = useState([])

  const csvHeaders = [ 
    {
      label: 'Timeframe', key: 'timeframe'
    },
    {
      label: 'Pickups', key: 'pickups'
    },
    {
      label: 'Dropoffs', key: 'dropoffs'
    },
    {
      label: 'Others', key: 'others'
    }
  ]

  const handleChangeDriver = e => {
    updateDriver(parseInt(e.target.value))
  }

  const handleChangeInterval = e => {
    updateScheduleInterval(parseInt(e.target.value))  
  }

  const handleClick = e => {
    e.target.className.includes('week-select-right') ? updateWeek(week + 1) : updateWeek(week - 1)
  }
  
  useEffect(() => {
    const buildDownloadDataSet = () => {
      let dataArray = []
      for (let week = 0; week < 52; week++) {
        for (let day = 0; day < 7; day++) {
          let dailyTasks = driverSchedule.filter(task => (
            task.week === week + 1 && task.day === day 
          ))
          let totals = dailyTasks.reduce((acc, curr) => {
            switch (curr.type) {
              case "Pickup":
                acc.pickups++
                break
              case "Dropoff":
                acc.dropoffs++
                break
              case "Other":
                acc.others++
                break
              default:
                break
            }
            return acc
          }, {
            pickups: 0,
            dropoffs: 0,
            others: 0
          })
          dataArray.push({
            week: week + 1,
            day: day,
            ...totals
          })
        }
      }
  
      let updatedDataSet = []
      let dataSetSliceSize = dataArray.length / scheduleInterval
  
      for (let i = 0; i < dataSetSliceSize; i++) {
        let starting = (i * scheduleInterval) + 1, 
            ending = ((i + 1) * scheduleInterval) + 1
        const setSlice = dataArray.slice(0, scheduleInterval)
        updatedDataSet.push(setSlice.reduce((acc, curr) => {
          acc.pickups += curr.pickups
          acc.dropoffs += curr.dropoffs
          acc.others += curr.others
          return acc
        }, {
          timeframe: `Day ${starting} - Day ${ending}`,
          pickups: 0,
          dropoffs: 0,
          others: 0
        }))
        dataArray = dataArray.slice(scheduleInterval)
      }
 
      setDataSet(updatedDataSet)
    }

    buildDownloadDataSet()
  }, [driverSchedule, scheduleInterval])

  return (
    <div className="Header">
      <div className="driver-dropdown-section">
        <label htmlFor="driver-dropdown">
          Driver:
        </label>
        <select 
          name="driver-dropdown" 
          className="dropdown-menu driver-dropdown"
          onChange={handleChangeDriver}
          value={currentDriver}
        >
          {drivers.map(driver => (
            <option 
              value={drivers.indexOf(driver) + 1} 
              key={`driver-${drivers.indexOf(driver) + 1}`}
            >
              {driver}
            </option>
          ))}
        </select>
      </div>
      <div className="week-select-section">
        {week > 1 && <button 
          className="week-select-button week-select-left"
          onClick={handleClick} 
        />}
        <span>Week {week}</span>
        {week < 52 && <button 
          className="week-select-button week-select-right"
          onClick={handleClick} 
        />}
      </div>
      <div className="download-schedule-section">
        <div className="download-dropdown-section">
          <label htmlFor="download-dropdown">
            Schedule Interval
          </label>
          <select 
            name="download-dropdown" 
            className="dropdown-menu download-dropdown"
            onChange={handleChangeInterval}
            value={scheduleInterval}
          >
            <option value={2} key={2}>2 days</option>
            <option value={4} key={4}>4 days</option>
            <option value={7} key={7}>7 days</option>
            <option value={14} key={14}>14 days</option>
            <option value={28} key={28}>28 days</option>
          </select>
        </div>
        <CSVLink
          data={dataSet}
          headers={csvHeaders}
          filename={`driver-schedule.csv`}
          className="download-schedule-link"
        >
          Download Schedule
        </CSVLink>
      </div>
    </div>
  )
}

export default Header