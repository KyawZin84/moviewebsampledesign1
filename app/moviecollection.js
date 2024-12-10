import React from 'react'

export const Moviecollection = (props) => {
    let {array,title} = props
  return (
    <>
     <h2 className="text-black dark:text-white text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {array.map((movie, index) => (
          <div key={index} className="min-w-[180px] max-w-[180px] bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <span>{movie.year}</span>
                <div className="flex items-center space-x-1">
                  <img src="./staricon.png" className='w-5 h-5' />
                  <span>{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
         <div className="min-w-[180px] max-w-[180px] bg-gray-800 rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center">
  <button
    type="button"
    className="text-white bg-[#8617d1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </>
  )
}
