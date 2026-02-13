import React, { useMemo } from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const { shows } = useAppContext();

  const uniqueMovies = useMemo(() => {
    if (!shows) return [];
    const map = new Map();
    shows.forEach((show) => {
      if (show.movie) {
        map.set(show.movie._id, show.movie);
      }
    });
    return Array.from(map.values());
  }, [shows]);

  return uniqueMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-8 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-lg font-medium mb-8">Now Showing</h1>

      <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-8">
        {uniqueMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mt-40">
        No Movies Available
      </h1>
    </div>
  );
};

export default Movies;
