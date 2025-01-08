import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '/src/assets/SmartUrlLogo.jpg'

const Navbar = () => {
  return (
    <>
      <nav className='bg-white shadow-lg fixed w-full  '>
        <div className='flex justify-between items-center p-3'>
          <div className='flex justify-center items-center'>
            <img className='rounded-full lg:w-24 md:w-24 w-14' src={logo} alt="Logo" />
            <h1 className='font-semibold md:text-2xl lg:text-2xl text-xl'>SmartUrl</h1>
          </div>

          <div className='lg:space-x-8'>

            <NavLink to={"/signin"} className='py-2 px-4 font-semibold rounded-lg text-gray-800 hover:text-black '>Log In</NavLink>
            <NavLink to={"/signup"} className=' outline-none py-3 px-4 border bg-blue-700 text-white hover:bg-blue-600 font-semibold rounded-md'>Sign Up</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar