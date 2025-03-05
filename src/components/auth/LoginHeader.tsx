
import React from "react";

const LoginHeader = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-white mb-8">
      <div className="mb-4">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-center">BUSINESS BUDDY</h1>
      <p className="text-xl mt-2 text-center">CUSTOMER RETENTION PLATFORM</p>
    </div>
  );
};

export default LoginHeader;
