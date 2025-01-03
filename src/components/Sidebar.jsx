import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';
import { IoAnalytics } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate=useNavigate();

  const sidebarMenu = [
    { title: "Create", path: "/create", icon: <IoMdCreate /> },
    { title: "Link", path: "/link-page", icon: <FiLink /> },
    { title: "Qr Code", path: "/qr-code",icon: <QrCode /> },
    { title: "Analytics", path: "/analytics",icon: <IoAnalytics />},
    { title: "Logout", path: "/logout",icon: <IoMdLogOut />},
  ]
  return (
    <>
      <div className='m-2 w-52 h-screen mt-[80px] fixed'>

        <div className='flex'>
          <span>SmartUrl</span>
        </div>
        <div className='flex flex-col space-y-6'>
          {sidebarMenu.map((item) => (
            <button onClick={()=>{
              navigate(item.path)
            }} className=' px-2 py-2 rounded-md hover:bg-slate-200 flex items-center space-x-5' to={item.path} key={item.title}>
              <span className='text-2xl'>{item.icon}</span>
              <p className=''>{item.title}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar 