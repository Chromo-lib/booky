import React from 'react';
import placeImg from '../assets/1.jpg';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
// resource://activity-stream/data/content/tippytop/images/facebook-com@2x.png
// moz-page-thumb://thumbnails/?url=https%3A%2F%2Fpensive-poincare-29c3c6.netlify.app%2F&revision=2050
let isDev = true;

export default function Card ({ id, title, url }) {

  return (
    <div className="h-100 card" data-id={id}>

      <a href={url} className="d-flex-col">
        <img
          alt={title}
          src={
            isDev
              ? placeImg
              : isChrome
                ? "chrome://favicon/size/48/" + url
                : "moz-page-thumb://thumbnails/?url=" + url
          } />

        <span className="truncate">{title}</span>
      </a>
    </div>
  );
}