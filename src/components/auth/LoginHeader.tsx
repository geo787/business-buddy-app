
import React from "react";

const LoginHeader = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-white mb-8">
      <div className="mb-4">
        <div className="h-16 w-16 bg-blue-600 rounded-md flex items-center justify-center overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#2563EB" />
            <path d="M30 30H50C61 30 70 39 70 50C70 61 61 70 50 70H30V30Z" fill="white"/>
            <path d="M50 50H70V70H50V50Z" fill="white"/>
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center">BUSINESS BUDDY</h1>
      <p className="text-xl mt-2 text-center">CUSTOMER RETENTION PLATFORM</p>
    </div>
  );
};

export default LoginHeader;
