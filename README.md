# eStores WorkHub

Welcome to the eStores WorkHub, a modern, role-based employee and partner management portal. This application provides a centralized platform for different user types, including Admins, Employees, College Partners, and Industry Partners, each with their own dedicated dashboard.

## ✨ Features

*   **Role-Based Access Control (RBAC):** Separate dashboards and permissions for different user roles (Admin, Employee, College, Industry).
*   **Secure Authentication:** Robust sign-up, sign-in, and sign-out functionality with session management.
*   **Admin Dashboard:** A comprehensive view for administrators to monitor all users, including their online status and last login times.
*   **AI-Powered Email Verification:** Utilizes Google's Gemini Pro model via Genkit to validate email addresses in real-time during the sign-up process.
*   **Modern UI/UX:** Built with clean, responsive components from Shadcn UI and styled with Tailwind CSS for a seamless user experience across all devices.
*   **Account Management:** Admins have the ability to delete their own accounts.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini Pro
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

Follow these steps to get the development environment running on your local machine.

### 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** Version 18 or later is recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **Package Manager:** This project uses `npm`, which comes bundled with Node.js. You can also use `yarn` or `pnpm` if you prefer.

### 2. Clone the Repository

First, clone the project repository to your local machine using Git:

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 3. Install Dependencies

Next, install all the necessary project dependencies using your package manager. This command reads the `package.json` file and downloads all the required libraries.

```bash
npm install
```

### 4. Running the Development Server

Once the dependencies are installed, you can start the local development server. This will launch the application and the Genkit AI flows simultaneously.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002). The site will automatically reload if you make any changes to the code.

## 📜 Available Scripts

This project comes with several pre-configured npm scripts to help with development:

*   `npm run dev`: Starts the Next.js development server and the Genkit development server concurrently. This is the primary command for local development.
*   `npm run build`: Compiles the application for production.
*   `npm run start`: Starts the production server after a build.
*   `npm run lint`: Lints the codebase to check for errors and style issues.
*   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## 📂 Project Structure

The project follows a standard Next.js App Router structure with some key directories:

```
src
├── ai/                # Genkit flows for AI functionality
│   └── flows/
├── app/               # Next.js App Router pages and layouts
│   ├── (auth)/        # Authentication-related routes (login, signup)
│   ├── (authenticated)/ # Protected routes for logged-in users
│   └── ...
├── components/        # Reusable React components
│   └── ui/            # Shadcn UI components
├── hooks/             # Custom React hooks
├── lib/               # Core application logic, data fetching, and definitions
└── ...
```

## 🔐 Authentication & Demo Credentials

The application uses a mock in-memory database (`src/lib/data.ts`) for user management. You can use the following credentials to test the different roles:

*   **Admin:** `admin@estores.com` / `admin123`
*   **Employee:** `employee@estores.com` / `password123`
*   **College:** `college@estores.com` / `password123`
*   **Industry:** `industry@estores.com` / `password123`
