# **App Name**: eStores WorkHub Portal

## Core Features:

- User Authentication: Secure user login and signup functionality with role-based access control.
- Role-Based Dashboard: Display a dashboard tailored to the user's role (Employee, Admin, College, Industry) upon login.
- Admin User Management: Admin users can view and manage user data across all roles.
- Password Hashing: Securely hash user passwords using `password_hash()` for storage in the database.
- Session Management: Manage user sessions to track logged-in users and their activity.
- Account Deletion: Admin users have the ability to delete their own accounts.
- Email Verification: Verify users' email using a tool during sign-up process.

## Style Guidelines:

- Primary color: Yellow (#FFD700) for accents, titles, and buttons to provide a bright and engaging feel.
- Background color: White (#FFFFFF) to create a clean and modern aesthetic.
- Text and borders: Black (#000000) for high contrast and readability.
- Body and headline font: 'Inter', a grotesque sans-serif providing a clean and modern look. Note: currently only Google Fonts are supported.
- Use a responsive, flexbox-based layout for a mobile-friendly design.
- Minimalist icons using only black to maintain color palette consistency.
- Subtle transitions for interactive elements to improve user experience.