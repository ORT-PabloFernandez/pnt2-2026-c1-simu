export default async function MovieDetailPage({ params }) {
    const { id } = params;

    const res = await fetch('https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies/' + id, { next: { revalidate: 60 } });
    if (!res.ok) {
        throw new Error('No se pudo obtener el detalle de la película');
    }
    const movie = await res.json();

    return (
        <main className="p-10 text-white">
            <a href="/" className="text-sm text-zinc-400 hover:text-white">
        Volver a inicio
      </a>
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <div className="space-y-3 text-zinc-300">
        <p><span className="font-semibold text-white">Año:</span> {movie.year || "-"}</p>

        <p>
          <span className="font-semibold text-white">Géneros:</span>{" "}
          {movie.genres?.length ? movie.genres.join(", ") : "-"}
        </p>

        <p>
          <span className="font-semibold text-white">Plot:</span>{" "}
          {movie.plot || "-"}
        </p>

        <p>
          <span className="font-semibold text-white">Cast:</span>{" "}
          {movie.cast?.length ? movie.cast.join(", ") : "-"}
        </p>
      </div>
    </main>
    );

    
}

