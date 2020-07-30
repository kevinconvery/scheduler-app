// data/index.js
// This file is intended to provide some data, but also to move constant values out of the 
// components.

export const errorMessages = {
  CREATE_CONFLICT: `Creating this task would cause it to conflict with another task. Would you like to overwrite the existing task?`,
  UPDATE_CONFLICT:`Updating this task would cause it to conflict with another task. Would you like to delete the previous task you had booked?`,
  INVALID_TIME: `You cannot book or update an appointment with a start time after or equal to the end time.`
}

export const taskList = [
  {
    day: 0,
    week: 1,
    start: 12,
    end: 15,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 2
  },
  {
    day: 0,
    week: 1,
    start: 9,
    end: 10,
    type: 'Dropoff',
    location: '',
    description: '',
    driver_id: 3
  },
  {
    day: 2,
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
  },
  {
    day: 5,
    week: 3,
    start: 1,
    end: 3,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 3
  },
  {
    day: 1,
    week: 11,
    start: 3,
    end: 4,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 1
  },
  {
    day: 5,
    week: 3,
    start: 6,
    end: 8,
    type: 'Dropoff',
    location: '',
    description: '',
    driver_id: 2
  },
  {
    day: 1,
    week: 1,
    start: 5,
    end: 7,
    type: 'Other',
    location: '',
    description: '',
    driver_id: 3
  },
  {
    day: 5,
    week: 1,
    start: 4,
    end: 5,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 1
  },
]

export const testTasks = [
  {
    day: 0,
    week: 1,
    start: 0,
    end: 2,
    type: 'Pickup',
    location: '',
    description: '',
    driver_id: 1
  },

  {
    day: 0,
    week: 1,
    start: 5,
    end: 7,
    type: 'Other',
    location: '',
    description: '',
    driver_id: 1
  }
]

export const scheduleTimes = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', 
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', 
  '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]

export const taskTypes = ['Pickup', 'Dropoff', 'Other']

export const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

export const drivers = [ 'George', 'Shane', 'Tania' ]

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

const getRandomNumber = size => {
  return Math.floor(Math.random() * size)
}

const generateRandomTask = () => {
  const taskTypes = [ 'Dropoff', 'Pickup', 'Other' ]
  let taskObject = {
    day: getRandomNumber(weekdays.length),
    week: getRandomNumber(4) + 1,
    start: getRandomNumber(scheduleTimes.length),
    type: taskTypes[getRandomNumber(3)],
    location: '',
    description: '',
    driver_id: getRandomNumber(3) + 1
  }
  // maximum four hour length on any individual task
  if (scheduleTimes.length - taskObject.start < 4) {
    taskObject.end = taskObject.start + getRandomNumber(scheduleTimes.length - taskObject.start)
  } else {
    taskObject.end = taskObject.start + getRandomNumber(4)
  }
  taskObject.end = taskObject.start + getRandomNumber(scheduleTimes.length - taskObject.start)
  return taskObject
}

export const generateRandomSchedule = numberOfTasks => {
  const taskArray = []
  for (let i = 0; i < numberOfTasks; i++) {
    taskArray.push(generateRandomTask())
  }
  return Array.from(new Set(taskArray))
}

export const gridCoordinates = populateGridCoordinates()