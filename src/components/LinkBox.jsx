import React, { useState } from 'react'


const LinkBox = ({ longUrl, shortUrl }) => {


  return (
    <div className='w-[80%] flex flex-col gap-4 border rounded-lg p-4 h-40 mb-6 shadow-lg'>
      <h1 className='text-xl font-semibold'>hiii</h1>

      <span className='text-blue-700 font-semibold hover:underline'>
        <a href={`${import.meta.env.VITE_BACK_URL}/` + shortUrl} target='_blank'>{`${import.meta.env.VITE_BACK_URL}/` + shortUrl}</a>
      </span>
      <span className='hover:underline'>
        <a href={longUrl} target='_blank'>{longUrl}</a>
      </span>
    </div>
  )
}

export default LinkBox