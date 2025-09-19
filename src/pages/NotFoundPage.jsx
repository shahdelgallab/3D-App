import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;