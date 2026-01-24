import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeformat'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const actualMovie = movie.movie || movie; // 🔥 important

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-59'>

      <img
        onClick={() => { navigate(`/movies/${actualMovie._id}`); scrollTo(0, 0); }}
        src={actualMovie.backdrop_path}
        alt=""
        className='rounded-lg h-52 w-full object-cover cursor-pointer'
      />

      <p className='font-semibold mt-2 truncate'>{actualMovie.title}</p>

      <p className='text-gray-400 text-sm mt-1'>
        {new Date(actualMovie.release_date).getFullYear()} •{" "}
        {actualMovie.genres?.slice(0, 2).map(genre => genre.name).join(" | ")} •{" "}
        {timeFormat(actualMovie.runtime)}
      </p>

      <div className='flex items-center justify-between mt-4 pb-3'>
        <button
          onClick={() => { navigate(`/movies/${actualMovie._id}`); scrollTo(0, 0); }}
          className='bg-primary hover:bg-primary/90 text-white py-1 px-3 rounded-lg text-sm mt-2 cursor-pointer'
        >
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary' />
          {actualMovie.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default MovieCard;
