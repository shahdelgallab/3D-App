import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
      <div className="max-w-md">
        <Rocket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        <Link 
          to="/" 
          className="mt-8 inline-block px-6 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;