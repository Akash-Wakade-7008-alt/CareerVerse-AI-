import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

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
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = getServerUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
