import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';
import { IoAnalytics } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ButtonSide from './ButtonSide';
import logo from '/src/assets/SmartUrlLogo.jpg'
const Sidebar = () => {
  return (
    <>
      <div className=' w-52 h-screen  fixed flex flex-col justify-between py-4'>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-center items-center'>
            <div className=''><img className='rounded-full w-24' src={logo} alt="SmartUrl" /></div>
            <span className='text-xl font-semibold'>SmartUrl</span>

          </div>
          <div className='flex flex-col space-y-6 justify-center items-center mt-6'>
            <ButtonSide label="Create" route="/create" icon={<IoMdCreate />} />
            <ButtonSide label="Links" route="/link-page" icon={<FiLink />} />
            <ButtonSide label="Qr Code" route="/qr-code" icon={<QrCode />} />
            <ButtonSide label="Analytics" route="/analytics" icon={<IoAnalytics />} />
            <ButtonSide label="Logout" route="/logout" icon={<IoMdLogOut />} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar 