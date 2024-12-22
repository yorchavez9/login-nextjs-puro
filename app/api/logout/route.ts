import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  // Obtener las cookies de la solicitud
  const cookies = request.headers.get("cookie");
  const myTokenName = cookies
    ?.split("; ")
    .find((cookie) => cookie.startsWith("myTokenName="))
    ?.split("=")[1];

  if (!myTokenName) {
    return NextResponse.json({ error: "Token no encontrado" }, { status: 401 });
  }

  try {
    // Verificar el token
    verify(myTokenName, "secret");

    // Serializar la cookie para eliminarla
    const serialized = serialize("myTokenName", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 0, 
      path: "/",
    });

    // Establecer la cookie en la respuesta
    const response = NextResponse.json("Logout successfully");
    response.headers.set("Set-Cookie", serialized); 

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error al cerrar sesión" },
      { status: 401 }
    );
  }
}
