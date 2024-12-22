"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

interface Credentials {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth', credentials);
            console.log(response);

            // Verifica si la respuesta contiene un mensaje de error
            if (response.data.message === "Invalid credentials") {
                console.log("Credenciales inválidas");
                alert("Las credenciales son incorrectas.");
            } else if (response.status === 200) {
                router.push('/dashboard');  // Redirige si la respuesta es exitosa
            }
        } catch (error) {
            console.error("Error al enviar las credenciales:", error);
            alert("Hubo un error al intentar iniciar sesión.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
