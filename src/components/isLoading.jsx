import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center w-full h-[559px] pb-10'>
        <span className='loading loading-bars loading-xs text-orange-500'></span>
        <span className='loading loading-bars loading-sm text-teal-500'></span>
        <span className='loading loading-bars loading-md text-sky-500'></span>
        <span className='loading loading-bars loading-lg text-fuchsia-500'></span>
    </div>
  )
}

export default Loading