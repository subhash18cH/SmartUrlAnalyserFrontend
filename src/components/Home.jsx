import React, { useEffect, useState } from 'react';
import { Plus, Link, History, Settings, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import api from './Api';

const Home = () => {
  const [urlsData, setUrlsData] = useState([])
  const [recentLinks, setRecentLinks] = useState([])
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith('www.') ? domain : `www.${domain}`;
    } catch (error) {
      toast.error("Invalid URL");
      return '';
    }
  };
  const getFaviconUrl = (url) => {
    try {
      const domain = extractDomain(url);
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (error) {
      return null;
    }
  };

  const getAllURLS = async () => {

    try {
      const response = await api.get("/api/url/user");
      if (response.status === 200) {

        setRecentLinks(response.data);
      }
    } catch (error) {
    }
  }

  const getTotalUserUrlsInfo = async () => {
    const response = await api.get("/api/url/total-stats");
    try {
      if (response.status === 200) {
        console.log(response)
        setUrlsData(response.data)
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log("e----", error)
    }
  }
  useEffect(() => {
    getTotalUserUrlsInfo()
    getAllURLS()
  }, [])

  return (
    <>
      <div className="bg-blue-50 min-h-screen">
        <Sidebar />

        {<div className="flex justify-center">
          <div className="w-full sm:w-[90%] lg:w-[80%] rounded-lg flex flex-col p-4 sm:p-6 
            ml-0 sm:ml-16 md:ml-52 mt-16 sm:mt-2">
            <h1 className='text-4xl  font-semibold mb-8'>Your Activity</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Total Links</h3>
                  <Link className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3 text-gray-900">{urlsData.totalUrls}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Total Clicks</h3>
                  <History className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3 text-gray-900">{urlsData.totalClicks}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Active Links</h3>
                  <Link className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3 text-gray-900">{urlsData.totalUrls}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recent Links</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Original URL</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Short URL</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {recentLinks.slice(0, 3).map((link, index) => (
                      <tr key={index}>
                        <td className="px-4 flex items-center gap-1 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 truncate max-w-[150px] sm:max-w-xs lg:max-w-md">
                          {getFaviconUrl(link.longUrl) ? (
                            <img
                              src={getFaviconUrl(link.longUrl)}
                              alt="Site favicon"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="text-bl-400">
                              <Globe size={20} />
                            </div>
                          )}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={link.longUrl}
                            className="hover:text-gray-800 transition-colors hover:underline"
                          >
                            {link.longUrl}
                          </a>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-blue-600 font-medium">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${import.meta.env.VITE_BACK_URL}/Sm/${link.shortUrl}`}
                            className="hover:text-blue-800 transition-colors hover:underline"
                          >
                            {`${import.meta.env.VITE_BACK_URL}/Sm/${link.shortUrl}`}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div> 
        }

      </div>
    </>
  );
};

export default Home;