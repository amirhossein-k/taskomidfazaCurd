// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// برای سیو کاربر در api داخلی  به صورت کوکی

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, family } = body;

    if (!name || !family) {
      return NextResponse.json(
        { error: "تمامی فیلدها الزامی است" },
        { status: 400 }
      );
    }

    // چون چیزی در مورد استفاده از دیتا بیس گفته نشده است پس برای نمونه در کوکی ذخیره میکنم
    const token = sign(
      {
        id: `USR-${Date.now()}`,
        name,
        family,
        email: "",
        createAt: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
      JWT_SECRET!,
      { expiresIn: "24h" }
    );

    const res = NextResponse.json({
      success: true,
      error: false,
      errorMessage: "",
      token: "",
    });

    res.cookies.set("tokken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 روز
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "خطا رخ داده است" }, { status: 500 });
  }
}
