import Link from "next/link";

const API_BASE =
  "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies";

async function getMovie(id) {
  const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <p className="text-2xl font-bold">Película no encontrada</p>
          <Link href="/movies" className="text-zinc-400 hover:text-white underline">
            ← Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 sm:px-10">
        <Link href="/movies" className="text-sm text-zinc-400 hover:text-white">
          ← Volver al listado
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.year && (
            <span className="text-zinc-400 text-sm">{movie.year}</span>
          )}
        </div>

        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-300"
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {movie.plot && (
          <div className="flex flex-col gap-1">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500">Sinopsis</h2>
            <p className="text-zinc-200 leading-relaxed">{movie.plot}</p>
          </div>
        )}

        {movie.cast?.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500">Reparto</h2>
            <ul className="flex flex-col gap-1">
              {movie.cast.map((actor) => (
                <li key={actor} className="text-zinc-300 text-sm">
                  {actor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
