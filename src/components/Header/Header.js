import React from 'react'
import './Header.css'

const Header = props => {
  const handleChange = e => {
    console.log(`${[e.target.name]}: ${e.target.value}`)
  }

  return (
    <div className="Header">
      <div className="driver-dropdown-section">
        <label htmlFor="driver-dropdown">
          Driver:
        </label>
        <select 
          name="driver-dropdown" 
          className="driver-dropdown"
          onChange={handleChange}
        >
          <option value={0} key={0}>-- Select a driver --</option>
          <option value={1} key={1}>George</option>
          <option value={2} key={2}>Shane</option>
          <option value={3} key={3}>Tania</option>
        </select>
      </div>
      <div className="week-select-section">
        <button className="week-select-button week-select-left" /><span>Week 1</span><button className="week-select-button week-select-right" />
      </div>
      <div className="download-schedule-section">
        <label htmlFor="download-dropdown">Download Schedule:</label>
        <select 
          name="download-dropdown" 
          className="download-dropdown"
          onChange={handleChange}
        >
          <option value={0} key={0}>-- Select an interval --</option>
          <option value={2} key={2}>2 days</option>
          <option value={4} key={4}>4 days</option>
          <option value={7} key={7}>7 days</option>
          <option value={14} key={14}>14 days</option>
          <option value={28} key={28}>28 days</option>
        </select>
      </div>
    </div>
  )
}

export default Header