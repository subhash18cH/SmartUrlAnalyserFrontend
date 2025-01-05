import React, { useState } from 'react'
import Sidebar from './Sidebar';
const QrCode = () => {

  const [longURL, setLongURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState()

  const handleClick = () => {

  }

  return (
    <>
      <Sidebar />
      <div className='flex justify-center'>
        <div className=' w-[70%] p-8 ml-60 mt-12'>
          <h1 className='text-3xl font-bold mb-10'>Create a Smart Code</h1>
          <div className=''>
            <div className="mb-6">
              <label className="block mb-3 font-semibold text-gray-700">
                Enter your URL <span className="text-red-500">*</span>
              </label>
              <input
                className="px-4 py-3 border rounded-lg w-[50%] outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                type="url"
                required
                placeholder="Enter your long URL here"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleClick}
              className={`relative px-12 py-3 rounded-lg font-semibold ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'
                } text-white`}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className='w-52 h-44 flex justify-center ml-96'>
            {/* <QrCode
                 title="title"
                 value="value"
                 bgColor="background-color"
                 fgcolor="foreground-color"
                 level="level"
                 size={256}/> */}
          </div>
        </div>



      </div>
    </>
  )
}

export default QrCode