## Rose Rocket Summer Challenge 2020

## Scheduler App

This app has been designed as my entry into the Summer Challenge.

It is written in React with the [react-csv](https://www.npmjs.com/package/react-csv) library being used to render the CSV download file.

I have also deployed the application [here](https://rr-summer-2020-kc.herokuapp.com/).

## Usage

# Creating and modifying schedule tasks

Click on the empty squares in the schedule grid to begin adding new tasks to the schedule. You can also click on a created task to modify the data within it, including the driver, location and description. If a location and description are used, they will appear within the task created. If not, a placeholder will be used to denote what kind of task it is.

# Downloading the schedule

In the top right section of the header, you can change the driver schedule to download the information in different timeframe intervals. The intervals are: 2 days, 4 days, 7 days, 14 days and 28 days. This will produce a CSV file that will organize the data, counting pickups, dropoffs and other tasks.


