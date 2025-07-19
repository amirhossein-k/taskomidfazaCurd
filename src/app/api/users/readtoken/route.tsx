// src\app\api\users\readtoken\route.tsx
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  const tokken = (await cookies()).get("tokken")?.value;

  if (!tokken) {
    return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
  }

  try {
    const read = verify(tokken, JWT_SECRET);
    console.log(read, "readdd");
    return NextResponse.json({ user: read });
  } catch (error) {
    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 403 });
  }
}
