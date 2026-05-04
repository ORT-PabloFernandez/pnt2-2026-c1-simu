"use client";

import { useEffect, useState } from "react";

export default function MovieTable({ movies }) {
  const [search, setSearch] = useState("");

  const [userEmail, setUserEmail] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
    // TODO: si existe `email`, leer `localStorage.getItem("favorites_" + email)`,
    //       parsearlo con JSON.parse y guardarlo en `favorites` con setFavorites
  }, []);

  function toggleFavorite(movieId) {
    // TODO: si `movieId` ya está en `favorites`, quitarlo; si no, agregarlo.
    //       Actualizar el estado `favorites` y guardar el nuevo array en
    //       localStorage bajo la clave "favorites_" + userEmail (usar JSON.stringify)
  }

  // TODO: filtrar el array `movies` usando `search` y guardar el resultado en `filteredMovies`

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por título..."
        className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-white/50"
      />
      {!userEmail && (
        <p className="text-sm text-zinc-400">
          <a href="/login" className="underline underline-offset-4 hover:text-white">
            Iniciá sesión
          </a>{" "}
          para poder guardar películas favoritas.
        </p>
      )}
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white">
        <thead className="bg-white/5 text-xs uppercase tracking-[0.4em] text-zinc-400">
          <tr>
            <th className="px-6 py-3">Título</th>
            <th className="px-6 py-3">Plot</th>
            <th className="px-6 py-3">Cast</th>
            {userEmail && <th className="px-6 py-3 text-center">Fav</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {movies.map((movie) => (
            <tr key={movie._id} className="transition hover:bg-white/5 focus-within:bg-white/5">
              <td className="px-6 py-4 font-semibold text-white">
                <button
                  type="button"
                  className="block text-left text-inherit"
                  onClick={() => {
                    console.log(`Seleccionada película: ${movie._id} - ${movie.title}`);
                    // TODO: redirigir al detalle cuando exista la ruta
                  }}
                >
                  {movie.title}
                </button>
              </td>
              <td className="px-6 py-4 text-zinc-200">{movie.plot || "-"}</td>
              <td className="px-6 py-4 text-zinc-200">
                {movie.cast?.length ? movie.cast.join(", ") : "-"}
              </td>
              {userEmail && (
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(movie._id)}
                    className={`text-xl transition hover:scale-110 ${
                      favorites.includes(movie._id) ? "text-red-500" : "text-zinc-600"
                    }`}
                    aria-label={favorites.includes(movie._id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    {favorites.includes(movie._id) ? "♥" : "♡"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
