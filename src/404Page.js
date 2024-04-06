import React from 'react';
import './not-found.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! We can't seem to find the page you're looking for.</p>
      <a href="/">Go Back Home</a>
    </div>
  );
};

export default NotFoundPage;