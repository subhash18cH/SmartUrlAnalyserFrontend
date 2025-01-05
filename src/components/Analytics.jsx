import React from 'react'
import Sidebar from './Sidebar';
const Analytics = () => {
  return (
    <>
      <Sidebar />
      <div className='flex justify-center'>
        <div className='w-[70%] p-8 ml-60 mt-12'>

          <div className="grid grid-cols-2 gap-6 p-6">

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Bar Graph</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Map</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Histogram</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Component 1</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Component 2</h3>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Analytics