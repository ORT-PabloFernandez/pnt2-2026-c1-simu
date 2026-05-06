import Link from "next/link";
import MovieTable from "./components/MovieTable";

const MOVIES_ENDPOINT =
  "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies";

const LIMIT = 20;

async function getMovies(page) {
  const url = `${MOVIES_ENDPOINT}?page=${page}&limit=${LIMIT}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("No se pudo obtener el listado de películas");
  }
  return res.json();
}

export default async function MoviesPage({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam) || 1);
  const movies = await getMovies(page);
  const hasNext = movies.length === LIMIT;

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            ← Volver a inicio
          </Link>
          <h1 className="text-3xl font-bold">Películas</h1>
          <p className="text-zinc-300">
            Hacé click en el título de una película para ver su detalle.
          </p>
        </div>

        <MovieTable movies={movies} />

        <div className="flex items-center justify-between gap-4">
          {page > 1 ? (
            <Link
              href={`/movies?page=${page - 1}`}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition hover:border-white/50 hover:bg-white/5"
            >
              ← Anterior
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-zinc-500">Página {page}</span>
          {hasNext ? (
            <Link
              href={`/movies?page=${page + 1}`}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition hover:border-white/50 hover:bg-white/5"
            >
              Siguiente →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  );
}
