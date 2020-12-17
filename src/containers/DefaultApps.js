import React, { useRef, useState } from 'react';
import useClickAway from '../hooks/useClickAway';
import Utils from '../utils/Utils';

const dapps = [
  { name: 'outlook', url: 'https://outlook.com' },
  { name: 'onedrive', url: 'https://onedrive.live.com' },
  { name: 'excel', url: 'https://www.office.com/launch/excel' },
  { name: 'word', url: 'https://www.office.com/launch/word' },
  { name: 'gmail', url: 'https://mail.google.com/' },
  { name: 'google news', url: 'https://news.google.com' },
  { name: 'google drive', url: 'https://drive.google.com' },
  { name: 'google maps', url: 'https://maps.google.com' },
  { name: 'google translate', url: 'https://translate.google.com' },
  { name: 'google calendar', url: 'https://www.google.com/calendar' }
];

export default function DefaultApps () {

  const settingsModalRef = useRef();
  const [show, setShow] = useState(false);

  useClickAway(settingsModalRef);

  return (<>

    <button onClick={() => { setShow(!show); }} className="btn-apps bg-inherit" title="Apps">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" fill="none" viewBox="0 0 24 24" stroke="#fff">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    </button>

    <div className="apps-modal" ref={settingsModalRef} style={{ display: show ? 'block' : 'none' }}>
      <ul className="w-100 d-flex column-2">
        {dapps.map(a => <li key={a.name} className="w-100 d-flex justify-start">
          <img
            alt={a.name}
            src={Utils.isChrome() && process.env.NODE_ENV === 'production'
              ? `chrome://favicon/size/48/${a.url}`
              : "https://www.google.com/s2/favicons?sz=64&domain_url=" + Utils.getDomainFromURL(a.url)
            }
            width="15"
            height="15"
          />
          <a href={a.url} className="ml-10" target="_blank" rel="noopener noreferrer">{a.name}</a>
        </li>)}
      </ul>
    </div>

  </>);
}