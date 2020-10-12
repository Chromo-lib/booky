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
        {bookmarks.map((b, idx) => <div key={b.id} className="card-container" id={idx} draggable={true}>
          <Card id={b.id} title={b.title} url={b.url} />
          <span className="btn-context-menu" onClick={() => { onAction('update', b); }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="m-0"><path fill="#fff" d="M14.354 2.353l-.708-.707a2.007 2.007 0 0 0-2.828 0l-.379.379a.5.5 0 0 0 0 .707l2.829 2.829a.5.5 0 0 0 .707 0l.379-.379a2.008 2.008 0 0 0 0-2.829zM9.732 3.439a.5.5 0 0 0-.707 0L3.246 9.218a1.986 1.986 0 0 0-.452.712l-1.756 4.39A.5.5 0 0 0 1.5 15a.5.5 0 0 0 .188-.037l4.382-1.752a1.966 1.966 0 0 0 .716-.454l5.779-5.778a.5.5 0 0 0 0-.707zM5.161 12.5l-2.549 1.02a.1.1 0 0 1-.13-.13L3.5 10.831a.1.1 0 0 1 .16-.031l1.54 1.535a.1.1 0 0 1-.039.165z" /></svg></span>
        </div>)}

        <div className="h-100 card d-flex-col" onClick={() => { onAction('add'); }}>
          <img src={placeImg} alt="add new bookmark" />
          <span>+</span>
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
