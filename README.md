# Task Dashboard

## Installation

node v18.16.0

<pre>
    npm install 
</pre>

## Start server

<pre>
    npm run server
</pre>

## Start app

<pre>
    npm run dev
</pre>

## Technical note
- Key functionalities: Task List/Grid, Pagination, New Task, Search, Filter, Statistics, Dark/Light mode, etc.
- Used feature based folder structure
- Used React Context API for state management.
- Used json-server for RESTful api
- Used Next.js app router for routing
- Used Tailwind CSS for styling
- Used react-intersection-observer to lazy-load views
- Mobile responsive

## Something that could have been done better if I had more time.
- Infinite Scrolling for Load More
- Hook up search/filter functionality into api server.
  Currently it searches/filters the tasks locally.