import React from 'react';
import '../styles/Card.css';
import placeImg from '../assets/place.png';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let isDev = true;

export default function Card ({ id, title, url }) {

  return (
    <div className="h-100 card" data-id={id}>

      <a href={url} className="d-flex-col">
        <img
          alt={title}
          src={isChrome && !isDev ? "chrome://favicon/size/48/" + url : placeImg}
        />

        <span className="truncate">{title}</span>
      </a>
    </div>
  );
}