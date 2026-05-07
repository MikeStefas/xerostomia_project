# Xerostomia Dashboard

A clinical trial management dashboard designed for the Xerostomia monitoring platform. Built with **Next.js**, **Material UI**, and **TypeScript**, this application provides an interface for researchers and clinicians to manage participant data, track clinical trials, and generate reports.

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd xerostomia-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Components Framework**: [MUI Toolpad Core](https://mui.com/toolpad/core/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & CSS Modules
- **State Management**: React Context & Hooks
- **Data Validation**: [Zod](https://zod.dev/)
- **Deployment**: [Docker](https://www.docker.com/)

---

## Features

- **Participant Management**: Detailed tracking of participant demographics and clinical statuses.
- **Patient Pairing**: Management and visualization of participant pairs.
- **Dynamic Data Grids**: High-performance data visualization with custom filtering and sorting.
- **User Management**: Role-based access and user profile administration.
- **Report Generation**: Infrastructure for viewing and fetching clinical reports.
- **Responsive Design**: Premium dashboard layout that adapts to various screen sizes.

---

## Project Structure

The project follows a feature-based architecture:

```text
src/
├── app/             # Next.js App Router (Routing & Layouts)
├── features/        # Business logic & components grouped by feature
│   ├── auth/        # Authentication & Authorization
│   ├── demographics/# Participant demographic management
│   ├── pairs/       # Patient pairing logic
│   ├── reports/     # Reporting & Analytics
│   └── users/       # User administration
├── shared/          # Utility functions, hooks, and reusable UI components
│   ├── components/  # Cross-feature UI components (e.g., DataGrid)
│   ├── providers/   # React Context Providers (Theme, Auth, etc.)
│   └── themes/      # MUI Custom Theme definitions
└── public/          # Static assets
```

---

## Docker Deployment

The project includes a `Dockerfile` and `docker-compose.yaml` for containerized environments.

**Build and Run with Docker:**

```bash
docker compose up --build
```

---

### Building for Production

```bash
npm run build
npm run start
```

---

## License

This project is private and proprietary. All rights reserved.
