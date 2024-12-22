import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("myTokenName")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.error("Error al verificar el token JWT:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
