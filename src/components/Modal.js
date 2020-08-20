import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';

export default function Modal ({ children }) {
  return ReactDOM.createPortal(
    <div className="modal d-flex">{children}</div>, document.getElementById('modal')
  );
}