# Task Manager App

A fullstack task management app built with **React + Vite** on the frontend and **FastAPI + PostgreSQL** on the backend. You can add tasks, mark them done, edit them, delete them, search by name, and filter by status — all connected to a real database.

---

## What's Inside

```
task-manager/
├── backend/               # Python + FastAPI
│   ├── routers/
│   │   └── tasks.py       # All API endpoints
│   ├── database.py        # Database connection
│   ├── models.py          # Task table definition
│   ├── schemas.py         # Request/response shapes
│   ├── main.py            # App entry point
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Your DB credentials (not committed)
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js       # All API calls (Axios)
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterTabs.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskForm.jsx
│   │   └── App.jsx            # Main app logic
│   └── .env               # Frontend env variables
├── package.json           # Root scripts (concurrently)
└── README.md
```

---

## Features

- **Add tasks** — give it a title and an optional description
- **Mark as done / undo** — click the circle to toggle status
- **Edit tasks** — update the title or description anytime
- **Delete tasks** — with a confirm step so you don't accidentally nuke something
- **Search** — filters tasks by name as you type
- **Filter tabs** — switch between All, Active, and Done views
- **Search + Filter together** — they work in combination (e.g. search "report" while on Done)
- **Live counts** — the tabs show how many tasks are in each category

---

## Prerequisites

Before you start, make sure you have these installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [PostgreSQL](https://www.postgresql.org/) with pgAdmin or psql access

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2. Set up the database

Open pgAdmin (or psql) and create a new database:

```sql
CREATE DATABASE taskmanager;
```

That's it — the tables get created automatically when you run the backend.

---

### 3. Set up the backend

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Now create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/taskmanager
```

> Replace `yourpassword` with your actual PostgreSQL password.

---

### 4. Set up the frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:8000
```

---

### 5. Install root dependencies

Back in the root folder:

```bash
cd ..
npm install
```

This installs `concurrently` so you can run both servers at once.

---

## Running the App

From the **root** folder, just run:

```bash
npm run dev
```

This starts both servers at the same time:

| What | URL |
|------|-----|
| Frontend (React) | http://localhost:5173 |
| Backend (FastAPI) | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

---

## API Reference

All endpoints are prefixed with `/tasks`.

| Method | Endpoint | What it does |
|--------|----------|--------------|
| `GET` | `/tasks/` | Get all tasks. Supports `?search=` and `?status=all/active/inactive` |
| `POST` | `/tasks/` | Create a new task |
| `PUT` | `/tasks/{id}` | Update a task's title and description |
| `PATCH` | `/tasks/{id}/toggle` | Toggle a task's completed status |
| `DELETE` | `/tasks/{id}` | Delete a task |

You can try all of these interactively at **http://localhost:8000/docs**.

---

## Running Servers Separately

If you'd rather run them in separate terminals:

**Backend:**
```bash
cd backend
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS v4 |
| Backend | Python, FastAPI, Uvicorn |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| HTTP Client | Axios |
| Dev tooling | Concurrently |

---

## Common Issues

**Backend won't start?**
- Make sure your virtual environment is activated
- Double-check the `DATABASE_URL` in `backend/.env`
- Make sure PostgreSQL is running and the `taskmanager` database exists

**Frontend can't connect to the backend?**
- Make sure the backend is running on port `8000`
- Check that `frontend/.env` has `VITE_API_URL=http://localhost:8000`
- Check the browser console for CORS errors

**Tailwind styles not working?**
- Make sure you have `@tailwindcss/vite` installed (`npm install @tailwindcss/vite`)
- `index.css` should start with `@import "tailwindcss";` (not the old `@tailwind` directives)

---

## Author

**Guilly Albert Tabasa**  
Computer Science Graduate — Imus Institute of Science and Technology  
GitHub: [github.com/Guilly02](https://github.com/Guilly02)  
Portfolio: [guilly-portfolio.vercel.app](https://guilly-portfolio.vercel.app)
