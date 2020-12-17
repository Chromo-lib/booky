import React from 'react';
import '../styles/Card.css';
import Utils from '../utils/Utils';

export default function Card ({ bookmark, index, onAction }) {

  return (
    <div className="h-100 card" data-id={index} id={'bookmark-' + bookmark.title} draggable={true}>

      <a href={bookmark.url} target="_self" rel="noopener" className="d-flex-col txt-center">
        <img
          alt={bookmark.title}
          src={Utils.isChrome() && process.env.NODE_ENV === 'production'
            ? "chrome://favicon/size/48/" + bookmark.url
            : "https://www.google.com/s2/favicons?sz=64&domain_url=" + Utils.getDomainFromURL(bookmark.url)
          }
        />
        <span className="truncate">{bookmark.title}</span>
      </a>

      <span className="btn-context-menu" onClick={() => { onAction('update', bookmark); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 16 16" className="m-0"><path fill="#fff" d="M14.354 2.353l-.708-.707a2.007 2.007 0 0 0-2.828 0l-.379.379a.5.5 0 0 0 0 .707l2.829 2.829a.5.5 0 0 0 .707 0l.379-.379a2.008 2.008 0 0 0 0-2.829zM9.732 3.439a.5.5 0 0 0-.707 0L3.246 9.218a1.986 1.986 0 0 0-.452.712l-1.756 4.39A.5.5 0 0 0 1.5 15a.5.5 0 0 0 .188-.037l4.382-1.752a1.966 1.966 0 0 0 .716-.454l5.779-5.778a.5.5 0 0 0 0-.707zM5.161 12.5l-2.549 1.02a.1.1 0 0 1-.13-.13L3.5 10.831a.1.1 0 0 1 .16-.031l1.54 1.535a.1.1 0 0 1-.039.165z" /></svg></span>
    </div>
  );
}