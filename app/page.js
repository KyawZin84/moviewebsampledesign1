'use client'

import React, { useState,useEffect } from 'react'
import { slides,movies,action,comedy,scifiction,casts } from './data';
import { Moviecollection } from './moviecollection';

const page = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const slidedescription = (data) => {
    let newtext = data
    if(data.length > 200){
     newtext=  data.slice(0,200)
    }
    return newtext;
  }

  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((movie, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${movie.imageUrl})`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-60 p-10">
            <div className="text-left max-w-lg">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>
              <p className="text-gray-400 mb-4">{movie.releaseDate}</p>
              <p className="text-gray-500 mb-4">{slidedescription(movie.description)}</p>
              <a
                href={movie.link}
                className="px-3 py-3 bg-[#8617d1] hover:bg-[#6f33be] text-white text-md font-semibold rounded-lg inline-flex items-center space-x-2"
              >
                <span>See More</span>
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 bg-white rounded-full ${index === activeIndex ? 'opacity-100' : 'opacity-50'}`}
          ></div>
        ))}
      </div>
    </div>

    <div class="bg-black text-white p-4">
    <h2 class="text-xl font-bold mb-4">Most popular celebrities</h2>
    <div class="flex scrollbar-hide space-x-4 overflow-x-auto">
    {casts.map((cast)=>(
      <div class="flex flex-col items-center cursor-pointer">
          <img src={cast.img} alt={cast.name} class="rounded-full min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] mb-2"/>
          <p class="text-center text-sm font-bold">{cast.name}</p>
      </div>
    ))}
    <div class="flex flex-col items-center  cursor-pointer rounded-full min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] mb-2">
    <button
    type="button"
    className="text-white bg-[#8617d1] font-lg rounded-full text-lg p-2.5 text-center inline-flex items-center mt-10 mb-2"
  >
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  </button>
  <h3 className="text-white">See More</h3>
      </div>
     </div>
</div>
    
    
    <div className="p-5">
    <Moviecollection array={movies} title="Top Rated Movies" />
    </div>

    <div className="p-5">
      <Moviecollection array={action} title="Action" />
    </div>

    <div className="p-5">
      <Moviecollection array={comedy} title="Comedy" />
    </div>

    <div className="p-5">
      <Moviecollection array={scifiction} title="Sci-Fiction" />
    </div>
      </>
  );

}

export default page