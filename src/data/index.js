export const taskList = [
  {
    day: 1,
    week: 1,
    start: 12,
    end: 15,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 2
  },
  {
    day: 1,
    week: 1,
    start: 9,
    end: 10,
    type: 'Dropoff',
    location: '',
    description: '',
    driver_id: 3
  },
  {
    day: 3,
    week: 1,
    start: 17,
    end: 18,
    type: 'Other',
    location: '',
    description: '',
    driver_id: 1
  },
  {
    day: 2,
    week: 1,
    start: 9,
    end: 11,
    type: 'Dropoff',
    location: '',
    description: '',
    driver_id: 1
  },
  {
    day: 4,
    week: 2,
    start: 5,
    end: 7,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 2
  }
]

export const scheduleTimes = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', 
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', 
  '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 PM'
]

export const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

const populateGridCoordinates = () => {
  const array = []

  weekdays.forEach(weekday => {
    scheduleTimes.forEach(time => {
      array.push({
        day: weekdays.indexOf(weekday),
        time: scheduleTimes.indexOf(time)
      })
    })
  })
  
  return array
}

export const gridCoordinates = populateGridCoordinates()