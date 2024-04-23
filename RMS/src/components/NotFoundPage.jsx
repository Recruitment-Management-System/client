import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-4">Oops! The page you are looking for could not be found.</p>
        <p className="text-gray-600">Please check the URL in the address bar and try again.</p>
        <img
          src="https://cdn.pixabay.com/photo/2017/03/16/21/18/error-2153816_960_720.png"
          alt="404 Error"
          className="mt-8 w-64 mx-auto"
        />
        <a href="/" className="text-indigo-600 hover:text-indigo-800 mt-4 block">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
