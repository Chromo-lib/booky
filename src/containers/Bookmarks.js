import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Sidebar from '../containers/Sidebar';
import AddBookmark from './AddBookmark';
import UpdateBookmark from './UpdateBookmark';

import plusImg from '../assets/plus.png';

export default function Bookmarks () {

  const [bookmarks, setBookmarks] = useState([]);
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    let folderBookmarksId = null;

    function onSearchCreateFolder (results) {
      if (results.length < 1) {
        window.chrome.bookmarks.create({ 'title': 'nodemarks' });
      }
      else {
        folderBookmarksId = '' + results[0].id;

        window.chrome.bookmarks.getSubTree(folderBookmarksId, (allBookmarks) => {
          setBookmarks(allBookmarks[0].children);
          localStorage.setItem('parent-folder-bookmarks', folderBookmarksId);
        });
      }
    }

    if (window.chrome) {
      window.chrome.bookmarks.search({ 'title': 'nodemarks' }, onSearchCreateFolder);
    }
  }, []);

  useEffect(() => {
    let v = bookmarks.slice(0);
    window.chrome.bookmarks.onCreated.addListener((_, bk) => {
      console.log(v);
      console.log(bk);
      setBookmarks([...bookmarks, bk]);
    });

    window.chrome.bookmarks.onRemoved.addListener((id) => {
      let nbookmarks = bookmarks.filter(b => parseInt(b.id, 10) !== parseInt(id, 10));
      console.log(bookmarks);
      console.log(nbookmarks);
      setBookmarks(nbookmarks);
    });
  }, []);

  return (
    <div className="row">
      {bookmarks.length > 0 && bookmarks.map(b => <div className="col-md-3"
        onClick={() => { setBookmark(b) }} key={b.id}>
        <Card title={b.title} url={b.url} id={b.id} />
      </div>)}

      <div className="col-md-3" onClick={() => { setBookmark(null) }}><Card title={'+'} /></div>

      <Sidebar>
        {bookmark ? <UpdateBookmark bookmark={bookmark} /> : <AddBookmark />}
      </Sidebar>
    </div>
  );
}
