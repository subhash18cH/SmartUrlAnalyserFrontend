import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import LinkBox from './LinkBox'
import api from './Api'
import toast from 'react-hot-toast'

const LinkPage = () => {

  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [domains, setDomains] = useState([])

  const getAllURLS = async () => {
    setLoading(true)

    try {
      const response = await api.get("url/getAllUrls");
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
          <h1 className='text-3xl font-bold mb-12'>SmartUrl Links</h1>
          <div className=''>
            {urls.map((item) => (
              <LinkBox key={item.shortUrl} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LinkPage