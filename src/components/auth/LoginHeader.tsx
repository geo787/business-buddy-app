
import React from "react";

const LoginHeader = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-white mb-8">
      <div className="mb-4">
        <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-2xl">BB</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center">BUSINESS BUDDY</h1>
      <p className="text-xl mt-2 text-center">CUSTOMER RETENTION PLATFORM</p>
    </div>
  );
};

export default LoginHeader;
