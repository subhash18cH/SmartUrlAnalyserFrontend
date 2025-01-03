import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=' flex'>
        <div className='w-64'>
          <Sidebar />
        </div>
        <div >
          hi
        </div>
      </div>
    </>

  )
}

export default Home