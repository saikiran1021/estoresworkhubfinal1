"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  addUser,
  findUserByEmailAndRole,
  updateUserLoginTimestamp,
  validAdminEmails,
  deleteUserById,
  findUserById,
} from "./data";

import {
  roles,
  type SessionPayload,
} from "./definitions";

import { verifyUserEmail } from "@/ai/flows/verify-user-email";

const SESSION_COOKIE_NAME = "session";

// -------------------------------
// SESSION HANDLING
// -------------------------------
async function createSession(payload: SessionPayload) {
  cookies().set(SESSION_COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

// -------------------------------
// SIGNUP VALIDATION SCHEMA
// -------------------------------
const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(10),
  role: z.enum(roles),
});

// -------------------------------
// SIGNUP ACTION
// -------------------------------
export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input.", success: false };
  }

  const { email, role } = validatedFields.data;

  // AI Email Verification
  const verification = await verifyUserEmail({ email });
  if (!verification.isValid) {
    return {
      error: `Email verification failed: ${verification.reason}`,
      success: false,
    };
  }

  // Admin signup restriction
  if (role === "Admin" && !validAdminEmails.includes(email)) {
    return {
      error: "This email is not authorized for Admin registration.",
      success: false,
    };
  }

  // Check if user already exists
  const existingUser = await findUserByEmailAndRole(email, role);
  if (existingUser) {
    return {
      error: `A user with this email already exists for the ${role} role.`,
      success: false,
    };
  }

  try {
    await addUser({ ...validatedFields.data });
  } catch (error) {
    return { error: "Database Error: Failed to create user.", success: false };
  }

  // Allow the form to show "success", then redirect
  // Use `redirect()` **after** the state returns
  redirect("/login?signup=success");

  return { error: null, success: true };
}

// -------------------------------
// SIGNIN SCHEMA
// -------------------------------
const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(roles),
});

// -------------------------------
// SIGNIN ACTION
// -------------------------------
export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: "Invalid fields.", success: false };
  }

  const { email, password, role } = validatedFields.data;

  try {
    const user = await findUserByEmailAndRole(email, role);

    if (!user) {
      return { error: "Invalid credentials.", success: false };
    }

    // Plain-text comparison (replace with bcrypt later)
    const passwordsMatch = user.password === password;

    if (!passwordsMatch) {
      return { error: "Invalid credentials.", success: false };
    }

    await updateUserLoginTimestamp(user.id);

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  } catch {
    return { error: "Database Error: Failed to sign in.", success: false };
  }

  redirect("/dashboard");

  return { error: null, success: true };
}

// -------------------------------
// SIGNOUT
// -------------------------------
export async function signOut() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

// -------------------------------
// DELETE ACCOUNT (ADMIN ONLY)
// -------------------------------
export async function deleteMyAccount() {
  const session = await getSession();

  if (!session || session.role !== "Admin") {
    return { error: "Unauthorized", success: false };
  }

  const user = await findUserById(session.userId);

  if (!user) {
    return { error: "User not found.", success: false };
  }

  await deleteUserById(user.id);
  await signOut();

  return { error: null, success: true };
}
