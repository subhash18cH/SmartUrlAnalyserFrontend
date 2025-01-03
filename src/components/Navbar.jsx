import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup")
  }

  const menuItems = [
    {
      title: "Home", path: "/"
    }
  ]

  return (
    <>
      <nav className='bg-white shadow-lg fixed w-full  '>
        <div className='flex justify-between items-center p-4'>
          <div>
            <h1 className='font-bold text-2xl text-red-700'>SmartUrl</h1>
          </div>

          <div className='space-x-8'>
            {menuItems.map((item) => (
              <NavLink to={item.path} key={item.title}>{item.title}</NavLink>
            ))}
            <button onClick={handleClick} className='text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md'>Sign Up</button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar