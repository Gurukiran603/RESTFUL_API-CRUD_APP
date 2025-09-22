RESTFUL_API (Express + MongoDB)

Setup
- Ensure MongoDB is running locally or set MONGODB_URI in .env

Install
```
npm install
```

Run (dev)
```
npm run dev
```

Run (prod)
```
npm start
```

Environment (.env)
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/restful_api
```

Endpoints
- GET /health
- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id


