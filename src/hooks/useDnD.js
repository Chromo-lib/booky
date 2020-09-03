import { useEffect } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';

export default function useDnD (bookmarks, setBookmarks) {
  useEffect(() => {
    let selectedIdx = 0;
    let replacedElementIndex = 0;
    let replacedElement = null;
    const listCards = Array.from(document.querySelectorAll('.card-container'));

    const dragStart = (e) => {
      e.dataTransfer.dropEffect = "move";
      selectedIdx = +e.currentTarget.id;
      e.currentTarget.classList.add('bg-trans');
      if (replacedElement) {
        replacedElement.classList.remove('border-dotted');
      }
    }

    const dragOver = (e) => {
      e.preventDefault();
      replacedElementIndex = +e.currentTarget.id;
      replacedElement = e.currentTarget;
      if (replacedElementIndex !== selectedIdx) {
        replacedElement.classList.add('border-dotted');
      }
    }

    const dragLeave = (e) => {
      e.preventDefault();
      if (replacedElementIndex) {
        replacedElement.classList.remove('border-dotted');
      }
    }

    const dragEnd = (e) => {
      e.preventDefault();
      let nbk = bookmarks.slice(0);

      if (replacedElement) {

        e.currentTarget.classList.remove('bg-trans');
        replacedElement.classList.remove('border-dotted');

        let tmp = nbk[replacedElementIndex];
        nbk[replacedElementIndex] = nbk[selectedIdx];
        nbk[selectedIdx] = tmp;

        LocalBookmarks.replaceAll(nbk);
        setBookmarks(nbk);

        listCards.forEach(el => {
          el.classList.remove('bg-trans');
        });
      }
    }

    const drop = (e) => {
      if (e.preventDefault) { e.preventDefault(); }
      if (e.stopPropagation) { e.stopPropagation(); }
    }

    listCards.forEach(el => {
      el.addEventListener('dragstart', dragStart, false);
      el.addEventListener('dragenter', dragLeave, false);
      el.addEventListener('dragover', dragOver, false);
      el.addEventListener('dragend', dragEnd, false);
      el.addEventListener('drop', drop, false);
    });

    return () => {
      listCards.forEach(el => {
        el.removeEventListener('dragstart', dragStart);
        el.removeEventListener('dragenter', dragLeave);
        el.removeEventListener('dragover', dragOver);
        el.removeEventListener('dragend', dragEnd);
        el.removeEventListener('drop', drop);
      });
    }
  }, [bookmarks]);
}