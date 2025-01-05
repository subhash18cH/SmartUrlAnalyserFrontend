import React from 'react';
import toast from 'react-hot-toast';

const LinkBox = ({ longUrl, shortUrl }) => {

  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain : `www.${domain}`;
    } catch (error) {
      toast.error("Invalid URL");
    }
  };
  return (
    <div className="w-4/5 flex flex-col gap-4 border rounded-lg p-4 min-h-[10rem] mb-6 shadow-lg">
      <h1 className="text-xl font-semibold">{extractDomain(longUrl)}</h1>
      <span className="text-blue-700 font-semibold hover:underline break-all">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
        >
          {`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
        </a>
      </span>

      <span className="hover:underline break-all">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={longUrl}
        >
          {longUrl}
        </a>
      </span>
    </div>
  );
};

export default LinkBox;