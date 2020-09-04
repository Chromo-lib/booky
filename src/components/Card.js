import React from 'react';
import '../styles/Card.css';
import Utils from '../utils/Utils';

export default function Card ({ id, title, url }) {

  return (
    <div className="h-100 card" data-id={id}>

      <a href={url} target="_self" className="d-flex-col">
        <img
          alt={title}
          src={Utils.isChrome() && process.env.NODE_ENV === 'production'
            ? "chrome://favicon/size/48/" + url
            : "https://www.google.com/s2/favicons?sz=64&domain_url=" + Utils.getDomainFromURL(url)
          }
        />

        <span className="truncate">{title}</span>
      </a>
    </div>
  );
}