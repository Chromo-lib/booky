import React from 'react';
import Bookmarks from './containers/Bookmarks';
import Timer from './components/Timer';
import FormSearch from './containers/FormSearch';
import Sidebar from './components/Sidebar';
import News from './components/News';
import Settings from './components/Settings';

export default function App () {

  return (<>
    <Sidebar />
    <div className="vh-90 vw-100 container d-flex-col py-3">
      <Timer />
      <FormSearch />
      <Bookmarks />

      <Settings />
    </div>
    <div className="container mb-20"><News /></div>
  </>);
}
