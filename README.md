# 💬 FeedbackHub — Micro-SaaS Feedback Management System

![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)

FeedbackHub is a full-stack Micro-SaaS platform designed to collect, process, and manage real-time customer feedback. Built with a modern **Java 21 + Spring Boot 3** backend and a reactive **React 19 + Tailwind CSS v4** admin dashboard, it allows SaaS creators to embed lightweight feedback widgets on client applications and manage issue lifecycles in real time.

---

## 🏗 System Architecture

FeedbackHub/
├── backend/            # Spring Boot REST API & Business Logic
│   ├── controller/     # Endpoints for Projects, Feedback, & Public Ingestion
│   ├── domain/         # JPA Entities (Project, FeedbackTicket, Enums)
│   ├── repository/     # Spring Data JPA Repositories
│   └── service/        # Service Layer & Key Generator
└── frontend/           # React 19 Single Page Application
├── public/         # Static assets & Embeddable widget JS script
└── src/
├── api.js      # Axios Client Abstraction
└── components/ # Atomic UI (Navbar, StatsCards, FeedbackList)


---

## 🛠 Tech Stack

* **Backend:** Java 21, Spring Boot 3.x, Spring Data JPA, Hibernate, MySQL Database, Maven
* **Frontend:** React 19 (Vite), Tailwind CSS v4 (`@tailwindcss/vite`), Axios
* **Embeddable Widget:** Lightweight vanilla JavaScript overlay bundle (`widget.js`)

---

## 📡 REST API Endpoints

### Projects API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | Fetch all registered projects |
| `GET` | `/api/projects/{id}` | Fetch project details by ID |
| `POST` | `/api/projects` | Create a new project & generate API Key |

### Feedback API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/feedback/project/{projectId}` | Fetch all feedback tickets for a project |
| `GET` | `/api/feedback/project/{projectId}/stats` | Aggregate counters (Total, Open, In Progress, Resolved) |
| `PATCH` | `/api/feedback/{id}/status` | Update ticket status (`OPEN`, `IN_PROGRESS`, `RESOLVED`) |
| `POST` | `/api/feedback/submit` | **Public API:** Submit feedback via API Key |

---

## 🔌 Embeddable JS Widget Integration

Client applications can integrate FeedbackHub by pasting the single-line script tag into their HTML:

```html
<script 
  src="http://localhost:5173/widget.js" 
  data-api-key="YOUR_PROJECT_API_KEY">
</script>
🚀 Local Setup Instructions
Prerequisites
Java Development Kit (JDK 21)

Node.js (v18+) & npm

MySQL Server running on localhost:3306