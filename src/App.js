import React from 'react';
import Bookmarks from './containers/Bookmarks';
import Timer from './components/Timer';
import FormSearch from './containers/FormSearch';

export default function App () {

  return (
    <div className="container py-3">
      <Timer />
      <FormSearch />
      <Bookmarks />
    </div>
  );
}
