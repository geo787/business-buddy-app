
import React from "react";
import { DiscordLogo } from "lucide-react";  // Fixing the import

const LoginHeader = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-white mb-8">
      <div className="mb-4">
        <div className="h-16 w-16 bg-[#5865F2] rounded-md flex items-center justify-center">
          <DiscordLogo size={40} color="white" strokeWidth={1.5} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center">BUSINESS BUDDY</h1>
      <p className="text-xl mt-2 text-center">CUSTOMER RETENTION PLATFORM</p>
    </div>
  );
};

export default LoginHeader;
