import {verify} from 'jsonwebtoken'

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get("cookie");
    const myTokenName = cookies?.split('; ').find(cookie => cookie.startsWith('myTokenName='))?.split('=')[1];

     if (!myTokenName) {
       throw new Error("Token no encontrado");
     }
    const user = verify(myTokenName, 'secret');

    if (typeof user === 'string') {
      throw new Error("Invalid token payload");
    }

    console.log(user);
    return NextResponse.json({
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el perfil" },
      { status: 500 }
    );
  }
}
