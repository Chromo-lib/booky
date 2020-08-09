import React from 'react';
import placeImg from '../assets/1.jpg';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
// resource://activity-stream/data/content/tippytop/images/facebook-com@2x.png
let isDev = true;

export default function Card ({ id, title, url, onClick }) {

  return (
    <div className="h-100 card d-flex-col" data-id={id}>

      <img src={
        isDev
          ? placeImg
          : isChrome
            ? "chrome://favicon/size/48/" + url
            : "resource://activity-stream/data/content/tippytop/images/" + url
      }
        onClick={onClick} alt={title} />

      <a href={url} className="truncate">{title}</a>
    </div>
  );
}