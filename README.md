# Simulation Framework

Welcome to the **Simulation Framework**, a tool for simulating dialogs with mental health chatbots.

## Prerequisites

- Node.js (including npm)
- Git

## Download

Clone the repository:

    
```bash
git clone https://github.com/liviakoller/sifra-submission.git
cd sifra-submission
```

Alternatively, download the repository as a ZIP file from GitHub.


## Setup & Installation

All steps below are executed in the terminal.

### Install Backend

```bash
cd backend
npm install         # Install backend dependencies
```

### Install Frontend

```bash
cd frontend
npm install         # Install frontend dependencies
```

### Configure Credentials

Copy `backend/example.env` to `backend/.env` and enter your OpenAI API key.

## Start the Application

Open separate terminals for frontend and backend and run the following commands:

### Backend

```bash
npm start
```

### Frontend

```bash
npm run dev
```

A local link will appear in the frontend terminal, which you can open in your browser.

## Features

- Configurable simulation of chatbot interactions
- Display simulated user personas
- Automated evaluation metrics shown at the end of every simulation
