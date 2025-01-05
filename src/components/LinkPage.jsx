import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import LinkBox from './LinkBox'
import api from './Api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FiFilePlus } from 'react-icons/fi'

const LinkPage = () => {

  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [domains, setDomains] = useState([])

  const getAllURLS = async () => {
    setLoading(true)

    try {
      const response = await api.get("/api/url/getAllUrls");
      console.log(response)
      if (response.status === 200) {
        setUrls(response.data);

      }
    } catch (error) {
      toast.error("Error fetching data!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllURLS()
  }, [])

  return (
    <>
      <Sidebar />
      <div className='flex justify-center'>
        <div className=' w-[70%] p-8 ml-60 mt-12'>
          {/* <h1 className='text-3xl font-bold mb-12'>SmartUrl Links</h1>
          <div className=''>
            {urls.map((item) => (
              <LinkBox key={item.shortUrl} {...item} />
            ))}
          </div> */}
          <div className="w-[92%] mx-auto ">
            {!loading && urls && urls.length > 0 && (
              <h1 className='text-slate-800 text-3xl sm:text-4xl font-semibold mb-12'>SmartUrl Links</h1>
            )}

            {loading ? (
              <div className='flex flex-col justify-center items-center h-72'>
                <span>Please wait...</span>
              </div>
            ) : (
              <>
                {urls && urls?.length === 0 ? (
                  <div className='flex flex-col items-center justify-center min-h-96 p-4'>
                    <div className='text-center'>
                      <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                        You didn't create any URL yet
                      </h2>
                      <p className='text-gray-600 mb-6'>Start by clicking on Create URL button</p>
                    </div>

                    <div className='flex justify-center w-full'>
                      <Link to="/create">
                        <button className='flex items-center px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus-ring-blue-200'>
                          <FiFilePlus className='mr-2' size={24} />
                          Create URL
                        </button>
                      </Link>
                    </div>

                  </div>
                ) : (
                  <>
                    <div className=''>
                      {urls.map((item) => (
                        <LinkBox key={item.shortUrl} {...item} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>



        </div>
      </div>



    </>
  )
}

export default LinkPage