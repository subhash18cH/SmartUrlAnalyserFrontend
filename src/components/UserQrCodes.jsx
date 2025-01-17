import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import api from './Api';
import { Loader2 } from 'lucide-react';
import QrCodeBox from './QrCodeBox';

const UserQrCodes = () => {
  const [userQrCodes, setUserQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("USERNAME");

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/qrcode/retrieve');
      if (response.status === 200) {
        console.log(response.data)
        setUserQrCodes(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 sm:ml-56 mt-16 sm:mt-20">
          <div className="mb-8 sm:mb-12 space-y-2">
            <h1 className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Your QR Codes
            </h1>

          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>

          ) : (
            <>
              {userQrCodes && userQrCodes?.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-gray-600 text-lg">Create your first QR code!</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Your generated QR codes will appear here
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6">
                  {userQrCodes.map((qrCode, index) => (
                    <QrCodeBox key={index} index={index} qrCode={qrCode} />
                  ))}
                </div>
              )
              }
            </>
          )
          }
        </div>
      </div>
    </div>
  );
};
export default UserQrCodes;