import React from 'react';
import '../styles/Switch.css';

export default function Switch ({ onToggle, status = true }) {
  return (
    <div className="sc-container">
      <div className="sc-switch"></div>
      <div onClick={onToggle} className={"sc-checked " + (status ? '' : 'sc-unchecked')}></div>
    </div>
  );
}