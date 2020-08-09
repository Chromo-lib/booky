import React, { useState, useEffect } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';
import Card from '../components/Card';
import Modal from '../components/Modal';
import AddOrUpdateBookmark from './AddOrUpdateBookmark';

import placeImg from '../assets/plus.png';

export default function Bookmarks () {

  const [bookmarks, setBookmarks] = useState(LocalBookmarks.getAll());
  const [bookmark, setBookmark] = useState(null);
  const [bkAction, setBkAction] = useState('add');
  const [showModal, setShowModal] = useState(false);

  const onUpdateBookmark = (bk) => {
    setBkAction('update');
    setBookmark(bk);
    setShowModal(!showModal);
  }

  const onRemoveBookmarks = (bk) => {
    let c = window.confirm("Are you sure you wish to delete this item? " + bk.title);
    if (c) {
      LocalBookmarks.remove(bk.id);
      setBookmarks(LocalBookmarks.getAll());
    }
  }

  const onShowModal = () => {
    setShowModal(!showModal);
  }

  useEffect(()=>{
    setBookmarks(LocalBookmarks.getAll());  
  },[showModal]);

  return (
    <div className="d-flex">

      {bookmarks.map(b => <div key={b.id}>
        <Card
          id={b.id}
          title={b.title}
          url={b.url}
          onClick={() => { onUpdateBookmark(b) }}
          onRemoveBookmarks={() => { onRemoveBookmarks(b) }}
        />
      </div>)}

      <div className="h-100 card d-flex-col" onClick={onShowModal}>
        <img src={placeImg} alt="" />
        <span>{'+'}</span>
      </div>

      {showModal && <Modal>
        <AddOrUpdateBookmark
          bookmark={bookmark}
          bkAction={bkAction}
          setShowModal={setShowModal}
          onClick={() => {
            setBkAction('add');
            onShowModal();
            setBookmark(null);
          }}
        />
      </Modal>}
    </div>
  );
}
