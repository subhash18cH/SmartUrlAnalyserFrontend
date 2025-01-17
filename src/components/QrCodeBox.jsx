import React from 'react'

const QrCodeBox = ({ index, qrCode }) => {
  return (
    <div key={index} className=" shadow-md gap-4 
    w-full sm:w-[95%] md:w-[90%]  flex sm:gap-4 sm:p-4 min-h-[8rem] sm:min-h-[10rem] mb-4 sm:mb6 items-center">
      <img
        src={`data:image/png;base64,${qrCode.image}`}
        alt={`QR Code ${index + 1}`}
        className="lg:w-28 lg:h-28 md:w-20 h-20  "
      />
      <div className='flex flex-col gap-4'>
        <a className="hover:underline" target='_blank' href={qrCode.shortUrl}><span>{qrCode.shortUrl}</span></a>
        
      </div>
    </div>
  )
}

export default QrCodeBox