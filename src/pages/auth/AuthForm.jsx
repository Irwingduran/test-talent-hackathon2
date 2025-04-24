import React from "react";

export default function LoginPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5fff5] p-4">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-2">
              <img 
                src="/Vector.png" 
                alt="Analytics logo" 
                width={109} 
                height={114} 
                className="mx-auto"
              />
            </div>
            <h1 className="text-5xl font-bold text-[#4ecca6] mb-2">SATeLite</h1>
            <p className="text-gray-600 text-center max-w-xs mx-auto">
            Control your fiscal orbit without leaving orbit
            </p>
          </div>
  
          <div className="w-full space-y-4">
            <a href="/login">
            <button className="w-full py-4 px-6 bg-[#4ecca6] text-gray-800 rounded-full font-medium text-lg hover:bg-[#3dbb95] transition-colors">
              Log In
            </button>
            </a>
            <div>
            <a href="/signup">
            <button className="w-full py-4 px-6 bg-[#e8f8e8] text-gray-800 rounded-full font-medium text-lg hover:bg-[#d8f0d8] transition-colors">
              Sign Up
            </button>
            </a>
            </div>
            <div>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-700 hover:text-[#4ecca6] transition-colors">
                Forgot Password?
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  