import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup")
  }
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },

  ]
  return (
    <>
      <nav className='bg-white shadow-lg '>
        <div className='flex h-20 justify-between items-center px-4'>
          <div>
            <h1 className='font-bold text-2xl text-red-700'>SmartUrl</h1>
          </div>

          <div className='hidden md:flex items-center space-x-8'>
            {menuItems.map((item) => (
              <NavLink to={item.path} key={item.title}>{item.title}</NavLink>
            ))}
            <button onClick={handleClick} className='text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md'>Sign Up</button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>



        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.title}
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.title}
                </NavLink>
              ))}
              <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200" onClick={handleClick}>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar