import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import api from './Api';

const QrCode = () => {
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
        console.log(response)
        toast.success("Qr code generated successfully!")
        setShortURL(`${import.meta.env.VITE_BACK_URL}/Sm/` + response.data);
        setShowQR(true);
      } else {
        toast.error('Failed to generate short URL');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=' h-[100vh]'>
      <Sidebar />
      <div className="flex justify-center">
        <div className="w-[90%] p-8 ml-60 mt-12">
          <h1 className="text-slate-800 text-3xl sm:text-4xl font-semibold mb-12">
            Create a Smart Code
          </h1>

          <div className="flex gap-1">
            <div className="flex-1">
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700">
                  Enter your URL <span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-3 border rounded-lg w-full outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  type="url"
                  required
                  placeholder="Enter your long URL here"
                  value={longURL}
                  onChange={(e) => setLongURL(e.target.value)}
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleGenerate}
                  className={`relative px-12 py-3 rounded-lg font-semibold ${isLoading
                    ? 'bg-blue-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-500'
                    } text-white`}
                >
                  {isLoading ? 'Generating...' : 'Generate QR Code'}
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className={`transform -translate-y-12 transition-all duration-300 ${showQR ? 'opacity-100' : 'opacity-0'}`}>
                {showQR && (
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <QRCodeSVG
                      value={shortURL}
                      size={200}
                      level="H"
                      className="rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;