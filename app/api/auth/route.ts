import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (email === "test@test.com" && password === "test123") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: "test@test.com",
        username: "test",
      },
      "secret"
    );
    const response = NextResponse.json({ message: "Login success" });
    const serialized = serialize('myTokenName', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // backend externo se usar 'none
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        path: '/'
    })
    response.headers.set("Set-Cookie", serialized);
    return response;
  }
  return NextResponse.json(
    { 
      message: "Invalid credentials",
      status: 401 
    },
  );
}
