# Simple CRUD App (Express + Vanilla JS)

## Setup
- Node.js 18+ recommended

## Install
```bash
npm install
```

## Run (dev)
```bash
npm run dev
```
Visit `http://localhost:3000`.

## Build/Run (prod)
```bash
npm start
```

## API Endpoints
- GET `/api/items`
- GET `/api/items/:id`
- POST `/api/items` { title, description }
- PUT `/api/items/:id` { title?, description? }
- DELETE `/api/items/:id`

Data is stored in-memory (resets on server restart).

