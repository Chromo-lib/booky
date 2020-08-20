import React, { useState } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';

export default function AddOrUpdateBookmark ({ bkAction, bookmark, onClick, setShowModal }) {

  const [state, setState] = useState({ id: '', title: '', url: '', ...bookmark });

  const onchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onAddBookmark = (e) => {
    e.preventDefault();
    let isSaved = LocalBookmarks.save(state.title, state.url);
    if (isSaved) { setShowModal(false); }
  }

  const onUpdateBookmark = (e) => {
    e.preventDefault();
    LocalBookmarks.update(state.id, state.title, state.url);
    setShowModal(false);
  }

  return (<>
    <form onSubmit={bkAction === 'add' ? onAddBookmark : onUpdateBookmark} className="d-flex-col">
      <h3>{bkAction} bookmark</h3>
      <div className="w-100 d-flex-col align-start mb-10">
        <label htmlFor="title" >Title</label>
        <input type="text" name="title" value={state.title} onChange={onchange} placeholder="Enter title" required />
      </div>

      <div className="w-100 d-flex-col align-start mb-10">
        <label htmlFor="url">Url</label>
        <input type="text" name="url" value={state.url} onChange={onchange} placeholder="Enter url" required />
      </div>

      <div className="w-100 d-flex">
        <button type="submit" className="mr-10">{bkAction}</button>
        <button type="reset" className="bg-red ml-10" onClick={onClick}>cancel</button>
      </div>
    </form>
  </>);
}