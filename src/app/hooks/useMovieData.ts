import { useState, useEffect } from "react";
import { fetchTopNetflixMovies, OmdbMovie } from "../services/omdbService";
import { topMovies } from "../data/mockData";

export interface EnrichedMovie {
  id: number;
  title: string;
  views: number;
  rating: number;
  genre: string;
  revenue: number;
  poster: string;
  plot: string;
  director: string;
  actors: string;
  year: string;
  runtime: string;
  imdbRating: string;
  isLive: boolean;
}

function mockToEnriched(m: (typeof topMovies)[number], idx: number): EnrichedMovie {
  return {
    ...m,
    poster: "",
    plot: "A critically acclaimed Netflix original series.",
    director: "N/A",
    actors: "N/A",
    year: "2023",
    runtime: "N/A",
    imdbRating: String(m.rating),
    isLive: false,
  };
}

function omdbToEnriched(omdb: OmdbMovie, mock: (typeof topMovies)[number]): EnrichedMovie {
  return {
    id: mock.id,
    title: omdb.Title,
    views: mock.views,
    rating: parseFloat(omdb.imdbRating) || mock.rating,
    genre: omdb.Genre?.split(",")[0] || mock.genre,
    revenue: mock.revenue,
    poster: omdb.Poster !== "N/A" ? omdb.Poster : "",
    plot: omdb.Plot || "",
    director: omdb.Director || "N/A",
    actors: omdb.Actors || "N/A",
    year: omdb.Year || "N/A",
    runtime: omdb.Runtime || "N/A",
    imdbRating: omdb.imdbRating || String(mock.rating),
    isLive: true,
  };
}

export function useMovieData() {
  const [movies, setMovies] = useState<EnrichedMovie[]>(topMovies.map(mockToEnriched));
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const live = await fetchTopNetflixMovies();
      if (cancelled) return;
      if (live.length > 0) {
        const merged = topMovies.map((mock, i) => {
          const match = live.find(
            (o) => o.Title.toLowerCase().includes(mock.title.toLowerCase().split(" ")[0])
          );
          return match ? omdbToEnriched(match, mock) : mockToEnriched(mock, i);
        });
        setMovies(merged);
        setIsLive(true);
      }
      setLoading(false);
      setLastUpdated(new Date());
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { movies, loading, isLive, lastUpdated };
}
