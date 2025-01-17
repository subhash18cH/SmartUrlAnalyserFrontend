import React, { createContext, useState } from 'react';

export const QRCodeContext = createContext({
  qrCodes: [],
  addQRCode: () => {},
  getUserQRCodes: () => []
});
export const QRCodeProvider = ({ children }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const addQRCode = (userName, longUrl, shortUrl) => {
    setQrCodes(prev => [...prev, {
      userName,
      longUrl,
      shortUrl,
      createdAt: new Date().toISOString(),
    }]);
  };
  const getUserQRCodes = (userName) => {
    return qrCodes.filter(code => code.userName === userName);
  };
  return (
    <QRCodeContext.Provider value={{ qrCodes, addQRCode, getUserQRCodes }}>
      {children}
    </QRCodeContext.Provider>
  );
};