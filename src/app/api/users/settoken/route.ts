// src\app\api\users\settoken\route.ts
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const { tokken, email, password, createAt, name, family } =
      await req.json();

    if (!tokken) {
      return NextResponse.json(
        { error: true, message: "توکن ارسال نشده" },
        { status: 400 }
      );
    }

    const res = NextResponse.json({
      success: true,
      error: false,
      errorMessage: "",
    });

    const token = sign(
      { id: `USR-${Date.now()}`, email, password, createAt, name, family },
      JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.cookies.set("tokken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 روز
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "خطا در ذخیره توکن" },
      { status: 500 }
    );
  }
}
