import React, { useState } from 'react';
import { MdOutlineHome } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';
import { IoAnalytics } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { Link } from 'react-router-dom';
import ButtonSide from './ButtonSide';
import logo from '/src/assets/SmartUrlLogo.jpg';
import CreateModal from './CreateModal ';
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='w-52 h-screen fixed flex flex-col justify-between py-4'>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-center items-center'>
            <Link to="/home" className=''>
              <img className='rounded-full w-24' src={logo} alt="SmartUrl" />
            </Link>
            <span className='text-xl font-semibold'>SmartUrl</span>
          </div>
          <div className='flex flex-col space-y-6 justify-center items-center mt-6'>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-5 px-5 py-2 rounded-lg hover:bg-gray-100 w-full font-semibold"
            >
              <IoMdCreate className='text-2xl' />
              <span className=''>Create</span>
            </button>
            <ButtonSide label="Links" route="/link-page" icon={<FiLink />} />
            <ButtonSide label="Qr Code" route="/qr-code" icon={<QrCode />} />
            <ButtonSide label="Analytics" route="/analytics" icon={<IoAnalytics />} />
            <ButtonSide
              label="Logout"
              route="/logout"
              icon={<IoMdLogOut />}
              isLogout={true}
            />
          </div>
        </div>
      </div>
      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;