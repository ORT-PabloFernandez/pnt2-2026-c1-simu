import Link from "next/link";
import MovieTable from "./components/MovieTable";

const MOVIES_ENDPOINT =
  "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies";

async function getMovies() {
  const res = await fetch(MOVIES_ENDPOINT, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("No se pudo obtener el listado de películas");
  }
  return res.json();
}

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            ← Volver a inicio
          </Link>
          <h1 className="text-3xl font-bold">Películas</h1>
          <p className="text-zinc-300">
            Seleccioná una fila para ver el detalle cuando se implemente la ruta correspondiente.
          </p>
        </div>

        <MovieTable movies={movies} />
      </main>
    </div>
  );
}
