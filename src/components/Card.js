import React from 'react';

const colors = ['dark', 'info', 'danger', 'success', 'secondary', 'primary'];

export default function Card ({ id, title, url }) {

  const onRemoveBookmark = () => {
    let c = window.confirm("Are you sure you wish to delete this item? " + title);
    if (c) {
      window.chrome.bookmarks.remove(id);
    }
  }

  return (
    <div className="h-100 card bg-transparent text-center text-white mb-3">

      <a href={url} target="_blank" rel="noopener"
        className="btn btn-link text-white text-decoration-none">
        <h3 className={"img-url d-flex justify-content-center align-items-center text-break bg-" + colors[colors.length * Math.random() | 0]}>
          {title}
        </h3>
      </a>

      <span onClick={() => { onRemoveBookmark() }}>x</span>
    </div>
  );
}