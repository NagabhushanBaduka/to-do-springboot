# Modern To-Do List Application

This project consists of a **Spring Boot REST Backend** and a **React Frontend**.

## Prerequisites
- **Java 17**
- **Maven**
- **Node.js 18+**
- **MySQL Server** (Running on port 3306)

---

## 🛠 Project Structure
- `backend/`: Spring Boot Java source code and Maven configuration.
- `frontend/`: React application (Vite-based).

---

## 🚀 How to Start the Project

### 1. Ensure MySQL is Running
The application uses a database named `tododb`.
Credentials used:
- **User**: `todo_user`
- **Password**: `password123`

### 2. Start the Backend
Open a terminal in the `backend` directory and run:
```bash
cd backend
./mvnw spring-boot:run
```
*The backend will be available at `http://localhost:8081`.*

### 3. Start the Frontend
Open a **new** terminal in the `frontend` directory and run:
```bash
cd frontend
npm run dev -- --port 3000
```
*The frontend will be available at `http://localhost:3000`.*

---

## 🛑 How to Stop the Project
Press `Ctrl + C` in both terminals where the processes are running.
# to-do-springboot
