import React, { useRef, useState } from 'react';
import '../styles/Switch.css';

export default function Switch ({ onchange }) {

  const [status, setStatus] = useState(true);
  const myRef = useRef();

  const onToggle = () => {
    status
      ? myRef.current.classList.add('sc-unchecked')
      : myRef.current.classList.remove('sc-unchecked');

    setStatus(!status);
    onchange(!status)
  }

  return (
    <div className="sc-container">
      <div className="sc-switch"></div>
      <div ref={myRef} onClick={onToggle} className="sc-checked"></div>
    </div>
  );
}