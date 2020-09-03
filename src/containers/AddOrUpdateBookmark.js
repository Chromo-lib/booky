import React, { useState } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';

export default function AddOrUpdateBookmark ({ bkAction, bookmark, onClick, setShowModal }) {

  const [state, setState] = useState({ id: '', title: '', url: '', ...bookmark });

  const onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onAddBookmark = (e) => {
    e.preventDefault();

    const pattern = /^((http|https):\/\/)/;
    let url = state.url;

    if (!pattern.test(url)) {
      url = "https://" + url;
    }

    let isSaved = LocalBookmarks.save(state.title, url);
    if (isSaved) { setShowModal(false); }
  }

  const onUpdateBookmark = (e) => {
    e.preventDefault();
    LocalBookmarks.update(state.id, state.title, state.url);
    setShowModal(false);
  }

  return (<>
    <form onSubmit={bkAction === 'add' ? onAddBookmark : onUpdateBookmark} className="d-flex-col">
      <h3 className="mb-0">{bkAction} bookmark</h3>

      <div className="w-100 d-flex-col align-start mb-10">
        <label htmlFor="title"><svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>Title</label>
        <input type="text" name="title" value={state.title} onChange={onchange} placeholder="twitter" required />
      </div>

      <div className="w-100 d-flex-col align-start mb-10">
        <label htmlFor="url"><svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>Url</label>
        <input type="text" name="url" value={state.url} onChange={onchange} placeholder="https://twitter.com/" required />
      </div>

      <div className="w-100 d-flex justify-between">
        <button type="submit" className="mr-10 col-2">{bkAction}</button>
        <button type="reset" className="bg-red ml-10 col-2" onClick={onClick}>cancel</button>
      </div>
    </form>
  </>);
}