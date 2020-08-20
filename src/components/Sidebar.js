import React, { useState } from 'react';
import '../styles/Sidebar.css';

export default function Sidebar () {

  const [show, setShow] = useState(false); // show sidebar (right

  const onShow = () => {
    setShow(!show);
  }

  return (
    <nav className={"nav pr-0 " + (show ? 'nav-open' : '')}>
      <div>
        <button className="nav__toggle" onClick={onShow}>{show ? 'X' : '+'}</button>
      </div>

      <div className="sidebar-content">

      </div>

    </nav>
  );
}