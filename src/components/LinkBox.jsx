import React from 'react';
import toast from 'react-hot-toast';

const LinkBox = ({ longUrl, shortUrl }) => {
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname;
      return new URL(url).hostname.startsWith('www.') ? domain : `www.${domain}`;
    } catch (error) {
      toast.error("Invalid URL");
    }
  };

  return (
    <div className="w-full sm:w-[95%] md:w-[90%] flex flex-col gap-3 sm:gap-4 border rounded-lg 
      p-3 sm:p-4 min-h-[8rem] sm:min-h-[10rem] mb-4 sm:mb-6 shadow-lg bg-white hover:shadow-xl 
      transition-shadow mx-auto">
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
        {extractDomain(longUrl)}
      </h1>
      
      <div className="flex flex-col gap-3">
        <span className="text-blue-700 font-semibold hover:underline break-all text-sm sm:text-base">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
            className="hover:text-blue-800 transition-colors"
          >
            {`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
          </a>
        </span>

        <span className="hover:underline break-all text-gray-600 text-sm sm:text-base">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={longUrl}
            className="hover:text-gray-800 transition-colors"
          >
            {longUrl}
          </a>
        </span>
      </div>
    </div>
  );
};

export default LinkBox;