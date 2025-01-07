import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const ButtonSide = ({ route, label, icon, isLogout }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isLogout) {
      e.preventDefault();
      localStorage.removeItem("JWT");
      localStorage.removeItem("shortUrl");
      navigate("/");
    }
  };
  return (

    <NavLink
      to={route}
      onClick={handleClick}
      className={({ isActive }) =>
        isActive ?
          "flex items-center font-semibold bg-blue-100 text-blue-600 w-full py-2 px-5 space-x-5 rounded-md " :
          "flex items-center font-semibold  hover:bg-gray-100 w-full py-2 px-5 space-x-5 rounded-md "
      }
    >
      <span className='text-2xl'>{icon}</span>
      <span className=''>{label}</span>

    </NavLink>
  )
}

export default ButtonSide