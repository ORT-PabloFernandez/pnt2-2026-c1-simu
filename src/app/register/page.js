"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL =
  "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/users/register";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrar el usuario");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="mt-1 text-sm text-zinc-400">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-white underline underline-offset-4">
              Iniciá sesión
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-zinc-300">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-white/50"
              placeholder="Tu nombre"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-white/50"
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-zinc-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-white/50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-900/40 border border-red-700/50 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-900/40 border border-green-700/50 px-4 py-2.5 text-sm text-green-300">
              ¡Usuario creado exitosamente! Redirigiendo...
            </p>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="rounded-lg bg-white px-4 py-2.5 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <Link href="/" className="text-sm text-zinc-500 hover:text-white">
          ← Volver a inicio
        </Link>
      </div>
    </div>
  );
}
