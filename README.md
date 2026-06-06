# Inventory & Order Management System

A full-stack Inventory and Order Management System built with React, FastAPI, and PostgreSQL.

## Live Demo
- **Frontend:** https://inventory-management-njjmixv60-gayee.vercel.app
- **Backend API:** https://inventory-management-bekt.onrender.com
- **API Docs:** https://inventory-management-bekt.onrender.com/docs

## Tech Stack
- **Frontend:** React.js
- **Backend:** Python FastAPI
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

## Features
- Product Management (CRUD)
- Customer Management (CRUD)
- Order Management with stock validation
- Dashboard with summary statistics
- Low stock alerts

## Docker Hub
https://hub.docker.com/r/userdockerr/inventory-backend

## Run Locally
```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/docs

## Business Rules
- Unique product SKUs
- Unique customer emails
- Orders auto-reduce stock
- Cannot order if insufficient stock