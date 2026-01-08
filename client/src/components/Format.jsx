import {ArrowBigLeft, ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Format = () => {
const navigate= useNavigate();

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt="Marvel Logo" className="max-h-11 lg:h-11 mt-20"/>
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians<br />of the Galaxy</h1>
        <div className='flex items-center gap-4'>
            
            <span className='text-sm font-medium'>Action | Adventure | Sci-fi</span>
            
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5' /> 2023
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5' /> 2h 30m
            </div>
        </div>
        <p className='text-gray-300 max-w-md'>A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.</p>
        <button className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer' onClick={()=>navigate("/movies")}>
          Explore More
          <ArrowRight className='inline-block ml-2 w-5 h-5'/>
        </button>
    </div>
  )
}
export default Format