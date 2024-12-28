import React from 'react'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <>
      <div className=' flex'>
        <div className='w-64'>
          <Sidebar />
        </div>
        <div className='bg-blue- w-full p-2 border border-l-2'>dd</div>
      </div>
    </>
  )
}

export default Home