import {useEffect} from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';

export default function useDnD (bookmarks, setBookmarks) {
  useEffect(() => {
    let selectedIdx = 0;
    let replacedElementIndex = 0;
    const listCards = Array.from(document.querySelectorAll('.card-container'));

    const dragStart = (e) => {
      e.dataTransfer.dropEffect = "move";
      selectedIdx = +e.currentTarget.id;
    }

    const dragOver = (e) => {
      e.preventDefault();
      replacedElementIndex = +e.currentTarget.id;
      e.currentTarget.classList.add('bg-trans');
    }

    const dragEnd = (e) => {
      e.preventDefault();
      let bbb = bookmarks.slice(0);

      let tmp = bbb[replacedElementIndex];
      bbb[replacedElementIndex] = bbb[selectedIdx];
      bbb[selectedIdx] = tmp;

      LocalBookmarks.replace(bbb);
      setBookmarks(bbb);

      listCards.forEach(el => {
        el.classList.remove('bg-trans')
      });
    }

    listCards.forEach(el => {
      el.addEventListener('dragstart', dragStart, false);
      el.addEventListener('dragover', dragOver, false);
      el.addEventListener('dragend', dragEnd, false);
    });

    return () => {
      listCards.forEach(el => {
        el.removeEventListener('dragstart', dragStart);
        el.removeEventListener('dragover', dragOver);
        el.removeEventListener('dragend', dragEnd);
      });
    }
  }, [bookmarks]);
}