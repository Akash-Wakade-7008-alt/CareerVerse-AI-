/**
 * localStorage-based user store for development (when Supabase isn't configured).
 * All users are identified solely by a UUID `userId`.
 */

export interface StoredUser {
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

const USERS_KEY = "cv_users_db";

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = globalThis?.localStorage?.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  globalThis?.localStorage?.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUserByEmail(email: string): StoredUser | null {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function getUserById(userId: string): StoredUser | null {
  const users = getUsers();
  return users.find((u) => u.userId === userId) ?? null;
}

export function createUser(user: StoredUser): void {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function getAllUsers(): StoredUser[] {
  return getUsers();
}
