import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { useStoreActions } from 'easy-peasy';

export default function Sidebar () {

  const [show, setShow] = useState(false); // show sidebar (right)
  const { setTimeZone } = useStoreActions(actions => actions.bkModel);

  const onShow = () => {
    setShow(!show);
  }

  const onSetZone = (e) => {
    e.preventDefault();
    setTimeZone(e.target.elements[0].value);
    e.target.elements[0].value = '';
  }

  return (
    <nav className={"nav pr-0 " + (show ? 'nav-open' : '')}>
      <div>
        <button className="nav__toggle" onClick={onShow}>{show ? 'X' : '+'}</button>
      </div>
      <div className="sidebar-content">
        <form onSubmit={onSetZone}>
          <label>Change time zone</label>
          <input type="text" name="timezone" className="w-100 mb-10" placeholder="Africa/Tunis" />
          <button type="submit" className="w-100">change time zone</button>
        </form>
      </div>
    </nav>
  );
}