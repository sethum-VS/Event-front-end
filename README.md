# Ticket Simulation System - Frontend

This is the frontend application for the Ticket Simulation System, designed to monitor real-time ticket processing and distribution. The app provides an intuitive user interface for starting simulations and viewing ticket release and retrieval logs in real time


## Features

Simulation Parameters: Input fields to configure:
-Max Ticket Capacity
-Total Tickets
-Ticket Release Rate (in milliseconds)
-Customer Retrieval Rate (in milliseconds)

Real-Time Logs: Dynamic log panel displays:
-Ticket releases by vendors.
-Ticket purchases by customers.


Setup:
-Clone the repository.
-Install dependencies:
```js
  npm install
```
Start the development server:
```js
  npm run dev
```

Ensure the backend (Spring Boot) is running and accessible at http://localhost:8080.

## How It Works:
-Enter simulation parameters in the input panel and click Start Simulation.
-The simulation ends automatically when the defined conditions are met. Logs can also be viewed in the backend database for reference.

This project aims to provide a seamless and interactive way to manage and monitor real-time ticket simulation processes.
