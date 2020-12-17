import React, { useState } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function CrudBookmark ({ bkAction, bookmark, setShowModal }) {

  const bookmarks = useStoreState(state => state.bkModel.bookmarks);
  const setBookmarks = useStoreActions(actions => actions.bkModel.setBookmarks);
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

  const onDeleteBookmark = () => {
    let c = window.confirm("Are you sure you wish to delete? " + bookmark.title);
    if (c) {
      let newBookmarks = bookmarks.filter(b => b.id !== bookmark.id);
      setBookmarks(newBookmarks);
      LocalBookmarks.replaceAll(newBookmarks);
      setShowModal(false);
    }
  }

  return (<>
    <form onSubmit={bkAction === 'add' ? onAddBookmark : onUpdateBookmark} className="d-flex-col">

      <div className="w-100 d-flex">
        <h3 className="m-0">{bkAction === 'update' ? 'Update or delete' : bkAction} A Bookmark</h3>
        <button type="button" onClick={() => { setShowModal(false); }} className="btn-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <hr />

      <div className="w-100 d-flex-col justify-start">
        <label htmlFor="title"><svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>Title</label>
        <input type="text" name="title" value={state.title} onChange={onchange} placeholder="twitter" required />
      </div>

      <hr />

      <div className="w-100 d-flex-col justify-start">
        <label htmlFor="url"><svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>Url</label>
        <input type="text" name="url" value={state.url} onChange={onchange} placeholder="https://twitter.com/" required />
      </div>

      <hr />

      <div className="w-100 d-flex justify-between">
        <button type="submit" className="mr-10 col-2">
          {bkAction === 'add'
            ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>}{bkAction}
        </button>
        {bkAction === 'update'
          ? <button type="button" className="bg-red ml-10 col-2" onClick={onDeleteBookmark}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>delete</button>
          : <button type="reset" className="bg-red ml-10 col-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>Reset</button>}
      </div>
    </form>
  </>);
}