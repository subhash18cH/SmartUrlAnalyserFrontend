import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import api from './Api';

const UserQrCodes = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!longURL) {
      toast.error('Please enter a URL!');
      return;
    }
    try {
      new URL(longURL);
    } catch (e) {
      toast.error('Please enter a valid URL!');
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/api/url/shortUrl', null, {
        params: {
          LongUrl: longURL,
        },
      });

      if (response.status === 200) {
        toast.success("QR code generated successfully!")
        setShortURL(`${import.meta.env.VITE_BACK_URL}/Sm/` + response.data);
        setShowQR(true);
      } else {
        toast.error('Failed to generate short URL');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Sidebar />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 sm:ml-56 mt-16 sm:mt-20">
          <h1 className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12">
            Your Qr Codes
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div>UNDER DEVELOPMENT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQrCodes;