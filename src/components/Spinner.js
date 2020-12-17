import React from 'react';
import '../styles/Spinner.css';

export default function Spinner () {
  return <div className="spinner-container">
    <div className="spinner-border"></div>
    <p className="mb-0">Updating data</p>
    <p className="mt-0">Please wait a moment...</p>
  </div>;
}