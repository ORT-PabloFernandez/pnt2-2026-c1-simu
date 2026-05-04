import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-20 sm:px-10">
        <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Simulación PNT2</p>
        <h1 className="text-4xl font-bold leading-tight text-white">
          Simulación de examen de la materia Programación de Nuevas Tecnologías (PNT2)
        </h1>
        <p className="max-w-2xl text-lg text-zinc-300">
          En esta simulación trabajaremos sobre los listados de la colección <span className="font-semibold text-white">movies</span> de la base
          de datos pública. Usá la opción de listado para ver las primeras 20 películas registradas en el backend.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/movies"
            className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-lg font-semibold transition hover:border-white hover:bg-white/10"
          >
            Ir al listado de películas
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-lg font-semibold text-zinc-300 transition hover:border-white/50 hover:text-white"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-lg font-semibold text-zinc-300 transition hover:border-white/50 hover:text-white"
          >
            Registrarse
          </Link>
        </div>
      </main>
    </div>
  );
}
