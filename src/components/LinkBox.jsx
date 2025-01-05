import React from 'react';

const LinkBox = ({ longUrl, shortUrl }) => {
  return (
    <div className="w-4/5 flex flex-col gap-4 border rounded-lg p-4 min-h-[10rem] mb-6 shadow-lg">
      <h1 className="text-xl font-semibold">hiii</h1>
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