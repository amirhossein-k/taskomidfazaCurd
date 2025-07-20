// src\app\api\users\readtoken\route.tsx
import { tokeRead } from "@/types/types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";


// برای اینکه بتوانم کوکی که به صورت httponly   هست را بخوانم
export async function GET(req: NextRequest) {
  const tokken = (await cookies()).get("tokken")?.value;

  if (!tokken) {
    return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
  }

  try {

    const read = verify(tokken, JWT_SECRET) as tokeRead;

    console.log(read, "readdd");
    return NextResponse.json({ user: read });
  } catch (error) {
    return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 403 });
  }
}
