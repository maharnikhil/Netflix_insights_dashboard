// OMDB API service — replace YOUR_OMDB_API_KEY with a free key from https://www.omdbapi.com/apikey.aspx
const API_KEY = "493b57d9";
const BASE_URL = "https://www.omdbapi.com";

export interface OmdbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Awards: string;
  BoxOffice: string;
  imdbVotes: string;
  Rated: string;
  Language: string;
  Country: string;
  Type: string;
}

export interface OmdbSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

const NETFLIX_TITLES = [
  "Stranger Things",
  "Squid Game",
  "Bridgerton",
  "The Crown",
  "Ozark",
  "The Witcher",
  "Money Heist",
  "Wednesday",
];

async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  const res = await fetch(url, { signal: controller.signal });
  clearTimeout(id);
  return res;
}

export async function fetchMovieDetails(title: string): Promise<OmdbMovie | null> {
  if (API_KEY === "YOUR_OMDB_API_KEY") return null;
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=series&plot=short`
    );
    const data = await res.json();
    return data.Response === "True" ? (data as OmdbMovie) : null;
  } catch {
    return null;
  }
}

export async function fetchTopNetflixMovies(): Promise<OmdbMovie[]> {
  const results = await Promise.all(NETFLIX_TITLES.map(fetchMovieDetails));
  return results.filter(Boolean) as OmdbMovie[];
}

export async function searchMovies(query: string): Promise<OmdbSearchResult[]> {
  if (API_KEY === "YOUR_OMDB_API_KEY") return [];
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.Response === "True" ? data.Search : [];
  } catch {
    return [];
  }
}
