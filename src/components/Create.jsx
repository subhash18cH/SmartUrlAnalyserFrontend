
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from './Api';
import { MdContentCopy } from "react-icons/md";

const Create = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/shortUrl', null, {
        params: {
          LongUrl: longURL,
        },
      });
      if (response.status === 200) {
        setShortURL(`${import.meta.env.VITE_BACK_URL}/` + response.data);
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
      toast.success('Short URL copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  };

  return (
    <div className="flex justify-center m-16">
      <div className="bg-white w-[70%] shadow-lg rounded-lg flex flex-col p-8 transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Create a link</h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Enter your URL <span className="text-red-500">*</span>
            </label>
            <input
              className="px-4 py-3 border rounded-lg w-[80%] outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            <div className="relative w-[50%]">
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



          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`relative px-12 py-3 rounded-lg font-semibold ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'
                } text-white`}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;