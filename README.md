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

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or another package manager like [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

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
