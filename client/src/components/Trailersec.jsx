import React from 'react'
import { useState } from 'react'
import { dummyTrailers } from '../assets/assets';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import BlurCircle from './BlurCircle';
const Trailersec = () => {
  const [currentTrailer,setCurrentTrailer] = useState(dummyTrailers[0]);  
  return (
     
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
        <p className='text-gray-300 font-medium text-lg mb-10'>Trailers</p>
        
        <div className="relative mt-6 aspect-video w-full">

          <BlurCircle top='-100px' right='-100px'/>
           <iframe
            src={currentTrailer.videoUrl}
            title="Movie Trailer"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
          {dummyTrailers.map((trailer)=>(
            <div key={trailer.image} className="relative group-hover:not-hover:opacity-50 hover:-translate-y1 duration-300
            transition max-md:h-60 md:max-h-60 cursor-pointer" onClick={()=>setCurrentTrailer(trailer)}>
              <img src={trailer.image} alt="trailer" className="w-full h-full object-cover rounded-lg brightness-75"/>
              <PlayCircleIcon strokeWidth={1.6} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </div>
          ))}
          </div>
    </div>
  )
}
export default Trailersec