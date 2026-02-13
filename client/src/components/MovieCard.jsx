import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeformat';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-59'>

      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className='rounded-lg h-52 w-full object-cover cursor-pointer'
      />

      <p className='font-semibold mt-2 truncate'>{movie.title}</p>

      <p className='text-gray-400 text-sm mt-1'>
        {movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "N/A"} •{" "}
        {Array.isArray(movie.genres)
          ? movie.genres.slice(0, 2).join(" | ")
          : "N/A"} •{" "}
        {movie.runtime ? timeFormat(movie.runtime) : "N/A"}
      </p>

      <div className='flex items-center justify-between mt-4 pb-3'>
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className='bg-primary hover:bg-primary/90 text-white py-1 px-3 rounded-lg text-sm mt-2 cursor-pointer'
        >
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary' />
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
