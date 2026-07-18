import React from 'react';

const ShimmerCard = () => {
  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl w-59 animate-pulse'>
      {/* Image Skeleton */}
      <div className='rounded-lg h-52 w-full bg-gray-700'></div>

      {/* Title Skeleton */}
      <div className='mt-3 h-5 bg-gray-700 rounded w-3/4'></div>

      {/* Subtitle/Info Skeleton */}
      <div className='mt-2 h-4 bg-gray-700 rounded w-1/2'></div>

      {/* Bottom Section Skeleton */}
      <div className='flex items-center justify-between mt-4 pb-3'>
        {/* Button Skeleton */}
        <div className='h-8 bg-gray-700 rounded-lg w-24'></div>

        {/* Rating Skeleton */}
        <div className='flex items-center gap-1'>
          <div className='w-4 h-4 rounded-full bg-gray-700'></div>
          <div className='h-4 bg-gray-700 rounded w-6'></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
