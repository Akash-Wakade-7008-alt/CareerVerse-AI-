import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const runtime = "nodejs";

// In-memory user store for server-side (since localStorage is client-only)
// In production, this would use Supabase
const SERVER_USERS_KEY = "__cv_users__";

function getServerUsers(): Array<{
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}> {
  const g = globalThis as Record<string, unknown>;
  if (!g[SERVER_USERS_KEY]) {
    g[SERVER_USERS_KEY] = [];
  }
  return g[SERVER_USERS_KEY] as Array<{
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: string;
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const users = getServerUsers();
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const userId = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return NextResponse.json({
      ok: true,
      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
