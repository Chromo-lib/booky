import React from 'react';

export default function AddBookmark () {

  const onAddBookmark = (e) => {
    e.preventDefault();

    let folderBookmarksId = localStorage.getItem('parent-folder-bookmarks');

    const title = e.target.elements[0].value;
    const url = e.target.elements[1].value;

    window.chrome.bookmarks.search({ url, title }, (results) => {
      if (results.length < 1) {
        window.chrome.bookmarks.create({ parentId: folderBookmarksId, title, url });
      }
    });
  }

  return (
    <form onSubmit={onAddBookmark}>
      <div className="mb-3">
        <label for="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" placeholder="Enter title" required />
      </div>

      <div className="mb-3">
        <label for="url" className="form-label">Url</label>
        <input type="url" className="form-control" id="url" placeholder="Enter url" required />
      </div>

      <button type="submit" className="btn btn-warning btn-block">+</button>
    </form>
  );
}