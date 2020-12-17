import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import LocalBookmarks from '../utils/LocalBookmarks';
import Card from '../components/Card';
import Modal from '../components/Modal';
import CrudBookmark from './CrudBookmark';

import placeImg from '../assets/plus.png';
import useDnD from '../hooks/useDnD';

export default function Bookmarks () {

  const [bookmark, setBookmark] = useState(null);
  const [bkAction, setBkAction] = useState('add');

  const [showModal, setShowModal] = useState(false);

  const { bookmarks } = useStoreState(state => state.bkModel);
  const { setBookmarks } = useStoreActions(actions => actions.bkModel);

  useDnD(bookmarks, setBookmarks);

  const onAction = (bkActionType = 'add', bk = null) => {
    setBkAction(bkActionType);
    setBookmark(bk);
    setShowModal(!showModal);
  }

  useEffect(() => {
    setBookmarks(LocalBookmarks.getAll());
  }, [showModal]);

  return (
    <div className="d-flex">

      <div id="list-cards" className="w-100 d-flex">
        {bookmarks.map((b, idx) => <Card bookmark={b} onAction={onAction} index={idx} key={idx} />)}

        <div className="h-100 card d-flex-col" onClick={() => { onAction('add'); }}>
          <img src={placeImg} alt="add new bookmark" />
        </div>
      </div>

      {showModal
        && <Modal>
          <CrudBookmark
            bookmark={bookmark}
            bkAction={bkAction}
            setShowModal={setShowModal}
          />
        </Modal>}
    </div>
  );
}
