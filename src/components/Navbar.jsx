import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '/src/assets/SmartUrlLogo.jpg'

const Navbar = () => {
  const navigate = useNavigate();


  return (
    <>
      <nav className='bg-white shadow-lg fixed w-full  '>
        <div className='flex justify-between items-center p-4'>

          <div className='flex justify-center items-center'>
            <img className='rounded-full w-24' src={logo} alt="Logo" />
            <h1 className='font-semibold text-2xl'>SmartUrl</h1>
          </div>

          <div className='space-x-8'>

            <NavLink to={"/signin"} className='py-2 px-4 font-semibold rounded-lg text-gray-800 hover:text-black'>Log In</NavLink>
            <NavLink to={"/signup"} className=' outline-none py-3 px-4 border bg-blue-700 text-white hover:bg-blue-600 font-semibold rounded-md'>Sign Up</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar