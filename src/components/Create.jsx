
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from './Api';
import { MdContentCopy } from "react-icons/md";
import Sidebar from './Sidebar';

const Create = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/api/url/shortUrl', null, {
        params: {
          LongUrl: longURL,
        },
      });
      if (response.status === 200) {
        console.log(response)
        setShortURL(`${import.meta.env.VITE_BACK_URL}/Sm/` + response.data);
        setIsSuccess(true);
        toast.success('URL shortened successfully!');
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (err) {
      toast.error('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL).then(() => {
      toast.success('Short URL copied!');
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  };

  return (
    <>
      <div>
        <Sidebar />

        <div className="flex justify-center">
          <div className=" w-[70%] rounded-lg flex flex-col p-8 ml-80 mt-12">
            <h1 className='text-slate-800 text-3xl sm:text-4xl font-semibold mb-12'>Create a link</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700">
                  Enter your URL <span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-3 border rounded-lg w-[70%] outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  type="url"
                  required
                  placeholder="Enter your long URL here"
                  value={longURL}
                  onChange={(e) => setLongURL(e.target.value)}
                />
              </div>


              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700">
                  Your short URL
                </label>
                <div className="relative w-[70%]">
                  <input
                    className="px-4 py-3 pr-10 border border-gray-300 rounded-lg w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    type="text"
                    placeholder="Your shortened URL will appear here"
                    value={shortURL}
                    readOnly
                  />
                  {shortURL && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none"
                      aria-label="Copy short URL"
                    >
                      <MdContentCopy size={20} />
                    </button>
                  )}
                </div>
              </div>
              <div className=" mt-12">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`relative px-12 py-3 rounded-lg font-semibold w-[70%] ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'
                    } text-white`}
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;