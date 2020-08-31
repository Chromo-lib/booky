import React from 'react';
import '../styles/Card.css';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let isDev = false;

function formatURL (url) {
  try {
    let urlInfos = new URL(url);
    url = urlInfos.hostname;
    return url.slice(url.indexOf('.') + 1);
  } catch (error) {
    return 'example.com'
  }
}

export default function Card ({ id, title, url }) {

  return (
    <div className="h-100 card" data-id={id}>

      <a href={url} target="_self" className="d-flex-col">
        <img
          alt={title}
          src={isChrome && !isDev
            ? "chrome://favicon/size/48/" + url
            : "https://www.google.com/s2/favicons?sz=64&domain_url=" + formatURL(url)
          }
        />

        <span className="truncate">{title}</span>
      </a>
    </div>
  );
}