# Xerostomia Project

A comprehensive ecosystem for monitoring and managing Xerostomia (dry mouth) symptoms. This repository contains the core backend services, AI analysis tools, and the clinician dashboard.

## 🌟 Overview

The Xerostomia project is built on a microservices architecture to provide a robust platform for clinical research and patient monitoring. It integrates automated AI analysis with a powerful management dashboard.

## 🏗 System Components

- **[Xerostomia Backend API](./xerostomia-backend)**: A NestJS/Prisma powerhouse handling data orchestration, authentication, and service integration.
- **[Xerostomia Dashboard (Frontend)](./xerostomia-frontend)**: A Next.js-based clinical management interface for researchers and clinicians.
- **[AI Microservice](./xerostomia-ai-microservice)**: A FastAPI service dedicated to advanced image analysis and data processing.
- **Infrastructure**: Containerized using Docker, proxied via Caddy, with Nextcloud for secure file storage and PostgreSQL for structured data.

## 🚀 Getting Started

### Prerequisites
- **Docker & Docker Compose** (Highly recommended)
- **Node.js 18+** (For local development)
- **Python 3.10+** (For AI service development)

### Running with Docker
The entire stack can be launched using the provided Docker Compose configuration:

```bash
docker compose up --build
```

This will initialize:
- **Backend API**: `http://localhost:5000`
- **Frontend Dashboard**: `http://localhost:3000`
- **Nextcloud Storage**: `http://localhost:8080`
- **PostgreSQL**: Port `5434`
- **Caddy Reverse Proxy**: Handling traffic and SSL configuration.

## 🛠 Directory Structure

```text
xerostomia_project/
├── xerostomia-backend/     # NestJS API (Node.js + Prisma)
├── xerostomia-frontend/    # Next.js Dashboard (React + MUI)
├── xerostomia-ai-service/  # FastAPI AI Analysis
├── docker-compose.yml      # Service Orchestration
├── Caddyfile               # Proxy Configuration
└── .env                    # Environment variables
```

## 📖 Component Details

### [Xerostomia Backend](./xerostomia-backend)
The core API of the system, responsible for:
- **Authentication**: JWT-based auth with access and refresh tokens.
- **User Management**: Role-based access control and patient-clinician pairing.
- **Data Management**: Handling demographic records and clinical report metadata.
- **Storage Integration**: Securely uploading and retrieving images from Nextcloud via WebDAV.

### [Xerostomia Frontend](./xerostomia-frontend)
A premium dashboard for clinicians and researchers:
- **Participant Tracking**: Centralized view of all trial participants.
- **Data Analytics**: Interactive grids for filtering and analyzing symptom data.
- **Report Generation**: Interface for generating and viewing patient reports.

### [Xerostomia AI Microservice](./xerostomia-ai-microservice)
Provides specialized analysis including:
- Processing clinical captures of the oral cavity.
- Generating objective scores for symptom severity.

---

## 🔧 Environment Configuration

Ensure you have a `.env` file in the root directory with the following keys:

```env
# Database Configuration
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=xerostomia_db

# Nextcloud Configuration
NEXTCLOUD_URL=http://nextcloud:80
NEXTCLOUD_ADMIN_USER=admin
NEXTCLOUD_ADMIN_PASSWORD=password

# Service Endpoints
FASTAPI_URL=http://xerostomia_ai_microservice:8000
BACKEND_URL=http://xerostomia_backend_api:5000
```

## 📄 License
This project is private and proprietary.
