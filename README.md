# Bookstore App

A bookstore web application using MERN solution with CRUD capabilities.

## Introduction

This web application is a practice to educate myself more about REST APIs. This website uses MongoDB and Express.js on the backend and React on the frontend.

## Requirement

Built on Ubuntu 20.04.6 LTS x86_64:

-   Node.js v18.x+

## Installation

To build this web app, first, you need to satisfy the requirement packages. There are two separate packages that need to be satisfied for each frontend and backend.

First, clone the repository into your local computer.

```
git clone https://github.com/Quillzyy/bookstore.git && cd bookstore
```

Then, let's initialize both backend and frontend.

### Backend

Assuming you are on the bookstore directory, go into the backend directory.

```
cd backend
```

Then, create a `config.js` file on that directory for the backend configuration.

```config.js
export const PORT = 5555;
export const DB_URI = ""; // Database endpoint for MongoDB
```

After that, install the package for backend and run the program.

```
npm install && npm run dev
```

### Frontend

Assuming you are on the bookstore directory, go into the frontend directory.

```
cd frontend
```

Install the package for frontend and run the program.

```
npm install && npm run dev
```
