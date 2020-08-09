//* Imports
import React from 'react';
import Bookmarks from './containers/Bookmarks';
import Timer from './components/Timer';

export default function App () {

  return (
    <div className="container py-3">
      <Timer />
      <div className="py-3">
        <input className="w-60" placeholder="Search the web" />
      </div>
      <Bookmarks />
    </div>
  );
}
