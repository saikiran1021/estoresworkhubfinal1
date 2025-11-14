'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { addUser, findUserByEmailAndRole, updateUserLoginTimestamp, validAdminEmails, deleteUserById, findUserById } from './data';
import { roles, type SessionPayload, type Role } from './definitions';
import { verifyUserEmail } from '@/ai/flows/verify-user-email';

const SESSION_COOKIE_NAME = 'session';

// Helper to manage session cookie
async function createSession(payload: SessionPayload) {
  cookies().set(SESSION_COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
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

// Sign Up Action
const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(10),
  role: z.enum(roles),
});

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your input.' };
  }

  const { email, role } = validatedFields.data;

  // AI Email Verification
  const verification = await verifyUserEmail({ email });
  if (!verification.isValid) {
    return { error: `Email verification failed: ${verification.reason}` };
  }

  // Admin signup restriction
  if (role === 'Admin' && !validAdminEmails.includes(email)) {
    return { error: 'This email is not authorized for Admin registration.' };
  }

  const existingUser = await findUserByEmailAndRole(email, role);
  if (existingUser) {
    return { error: `A user with this email already exists for the ${role} role.` };
  }

  try {
    // In a real app, you'd hash the password here. e.g., using bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);
    await addUser({ ...validatedFields.data });
  } catch (error) {
    return { error: 'Database Error: Failed to create user.' };
  }

  redirect('/login?signup=success');
}


// Sign In Action
const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(roles),
});

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { email, password, role } = validatedFields.data;

  try {
    const user = await findUserByEmailAndRole(email, role);

    if (!user) {
      return { error: 'Invalid credentials.' };
    }

    // In a real app, you would compare the hashed password
    // const passwordsMatch = await bcrypt.compare(password, user.password);
    const passwordsMatch = user.password === password;

    if (!passwordsMatch) {
      return { error: 'Invalid credentials.' };
    }
    
    await updateUserLoginTimestamp(user.id);

    await createSession({ userId: user.id, email: user.email, role: user.role });
  } catch (error) {
    return { error: 'Database Error: Failed to sign in.' };
  }

  redirect('/dashboard');
}

// Sign Out Action
export async function signOut() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect('/login');
}

// Delete Account Action
export async function deleteMyAccount() {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
        return { error: "Unauthorized" };
    }

    const user = await findUserById(session.userId);
    if (!user) {
        return { error: "User not found." };
    }

    await deleteUserById(user.id);
    await signOut();
}
