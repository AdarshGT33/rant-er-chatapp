import { animationDefaultOptions } from '../../../../lib/utils.js'
import React from 'react'
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      <Lottie isClickToPauseDisabled={true} height={200} width={200} options={animationDefaultOptions}/>
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl text-center duration-300'>
        <h3 className='poppins-medium'>
          Hi<span className='text-emerald-400'>!</span> Welcome To <span className='text-emerald-400'>Rant-Er</span> Chat App 
        </h3>
      </div>
    </div>
  )
}

export default EmptyChatContainer