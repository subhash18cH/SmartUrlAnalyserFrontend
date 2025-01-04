import React from 'react'
import Sidebar from './Sidebar'
import LinkBox from './LinkBox'

const LinkPage = () => {
  const a = [{
    name: "aman", age: 12, sex: "male",
    name: "aman", age: 12, sex: "male",
    name: "aman", age: 12, sex: "male",
    name: "aman", age: 12, sex: "male",
    name: "aman", age: 12, sex: "male",
    name: "aman", age: 12, sex: "male",
  }]
  return (
    <>
      <Sidebar />
      <div className='flex justify-center'>
        <div className=' w-[70%] p-8 ml-60 mt-12'>
          <h1 className='text-3xl font-bold mb-4'>SmartUrl Links</h1>
          <div>
            {a.map((item) => (
              <LinkBox />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LinkPage