import React, { useState, useEffect } from 'react';

export default function UpdateBookmark ({ bookmark }) {

  const [state, setState] = useState({ ...bookmark });

  const onchange = (e) => {
    setState({ [e.target.name]: e.target.value });
  }

  const onUpdateBookmark = (e) => {
    e.preventDefault();
    window.chrome.bookmarks.update(bookmark.id, { title: state.title, url: state.url }, (result) => {
      window.location.reload();
    });
  }

  useEffect(() => {
    setState({ ...bookmark });
  }, [bookmark.id]);

  return (
    <form onSubmit={onUpdateBookmark}>
      <div className="mb-3">
        <label for="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Enter title"
          onChange={onchange}
          value={state.title}
          required
        />
      </div>

      <div className="mb-3">
        <label for="url" className="form-label">Url</label>
        <input
          type="url"
          className="form-control"
          name="url"
          placeholder="Enter url"
          onChange={onchange}
          value={state.url}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning btn-block">update</button>
    </form>
  );
}