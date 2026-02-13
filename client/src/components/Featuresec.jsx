import { ArrowRight } from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { useAppContext } from '../context/AppContext';

const Featuresec = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  // ✅ REMOVE DUPLICATE MOVIES FROM SHOWS
  const uniqueMovies = useMemo(() => {
    if (!shows) return [];

    const movieMap = {};
    shows.forEach(show => {
      if (show.movie && show.movie._id) {
        movieMap[show.movie._id] = show.movie;
      }
    });

    return Object.values(movieMap);
  }, [shows]);
  console.log("shows:", shows);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      
      <div className='relative flex items-center justify-between pt-20 pb-10'>
        <BlurCircle top='0' right='-80px' />
        <p className='text-gray-300 font-medium text-lg'>Now showing</p>

        <button
          className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'
          onClick={() => navigate("/movies")}
        >
          View All
          <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
        </button>
      </div>

      {/* ✅ USE uniqueMovies INSTEAD OF shows */}
      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
        {uniqueMovies.slice(0, 4).map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className='flex flex-col justify-center md:flex-row items-center md:items-stretch gap-6 mb-20'>
        <button
          className='px-6 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer mt-5'
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
        >
          Show More
        </button>
      </div>

    </div>
  );
};

export default Featuresec;
