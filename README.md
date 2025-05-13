# MealMate

**MealMate** is a React + Vite application designed for meal planning and tracking. It allows users to manage their weekly meal plans, add and edit meals, and track their progress. The app interacts with a simple local JSON backend powered by JSON Server, making it easy to simulate a RESTful API without a full-fledged server.

---

![Vite](https://img.shields.io/badge/Vite-Frontend-blueviolet)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![JSON Server](https://img.shields.io/badge/JSON--Server-Backend-green)

---

## Requirements

- Node.js 18+
- npm (comes with Node)
- Python (only if you're using a virtual environment)

---

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ct_mealmate_vite.git
cd ct_mealmate_vite
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install JSON server globally
```bash
npm install -g json-server
```

(If already installed, skip this step.)

### 4. Start the backend server
```bash
npx json-server --watch db.json --port 3001
```
- Backend available at `http://localhost:3001`

### 5. Start the frontend server
```bash
npm run dev
```
- Frontend available at `http://localhost:5173/`

---

## Notes

- Ensure both servers are running!
- Default users and meals are stored inside `db.json`.
- To fix dependency issues, run:
```bash
npm install --legacy-peer-deps
```

---

## Demo

- Local demo: [http://localhost:5173/](http://localhost:5173/)

---
