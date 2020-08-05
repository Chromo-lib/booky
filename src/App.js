//* Imports
import React from 'react';
import Bookmarks from './containers/Bookmarks';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;
//const Settings = React.lazy(() => import('./components/Settings'));

export default function App () {

  return (
    <div className="container py-3">
      <Bookmarks />
    </div>
  );
}
