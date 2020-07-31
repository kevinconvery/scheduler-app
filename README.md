# Rose Rocket Summer Challenge 2020 - Scheduler App

This app has been designed as my entry into Rose Rocket's coding challenge, a dispatcher/driver task scheduling app.

It is written in [React](https://reactjs.org/) set up using [create-react-app](https://github.com/facebook/create-react-app) and uses the [react-csv](https://www.npmjs.com/package/react-csv) library to generate the driver task spreadsheet report.

I have also deployed the application [here](https://rr-summer-2020-kc.herokuapp.com/).

# Usage

# Running the app

Clone the repository, then use `npm install` to install its dependencies and `npm start` to start the app. 

## Creating tasks

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/scheduler-main-view-2.png "Picture of the schedule view with a selected cell highlighted in blue")

The main schedule view shows tasks in the schedule as well as available time slots highlighted in blue as the mouse pointer moves over them.

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/scheduler-main-view-1.png "Picture of the main view with descriptions and/or locations, and also a highlighted cell.")

If a task in the schedule has a description and/or a location, this will be reflected in the schedule view.

Click on the empty squares in the schedule grid to begin adding new tasks to the schedule. You can also click on a created task to modify the data within it. If a location and/or description are provided, they will appear within the task created. If not, a placeholder will be used to denote what kind of task it is.

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/create-task-screen.png "Create task screen")

The create task menu will allow you to build a task from the information provided.

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/create-overwrite-screen.png "Error screen from the create menu")

If there is a task conflict, the menu will prompt you with an appropriate error.

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/toggle-week-menu-image.png "Week toggle menu image.")

Toggling the arrows on the week menu in the schedule view will cycle through schedule entries in a given week.

## Updating and deleting tasks

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/edit-task-screen.png "Edit Task Screen")

Tasks can be updated and deleted by clicking on them. When the schedule is updated, it will render based on the updated schedule information. 

If a time conflict occurs when updating a task with another existing task, the screen will prompt with a request to overwrite the conflicting task.

## Downloading the schedule

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/schedule-download-menu.png "Scheduler Download Menu")

In the top right section of the header, you can change the driver schedule to download the information in different timeframe intervals. The intervals are: 2 days, 4 days, 7 days, 14 days and 28 days. This will produce a CSV file with counts of pickups, dropoffs and other appointments in the appropriate timeframes specified.

![alt-text](https://github.com/kevinconvery/rr-summer-challenge/blob/master/public/images/download-spreadsheet-sample.png "Sample timeframe report for a driver.")

The schedule downloaded will vary based on the driver selected, the schedule interval specified and entries in the schedule. When the schedule is updated, the report produced will also update.
