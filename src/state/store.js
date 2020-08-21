import { action } from 'easy-peasy';
import LocalBookmarks from '../utils/LocalBookmarks';
import TimeService from '../services/TimeService';

const bkCrud = {
  onRemoveBookmark: action((state, bk) => {
    let c = window.confirm("Are you sure you wish to delete? " + bk.title);
    if (c) {
      let newBookmarks = state.bookmarks.filter(b => b.id !== bk.id);
      state.bookmarks = newBookmarks;
      LocalBookmarks.replaceAll(newBookmarks);
    }
  }),
}

const bkModel = {
  bookmarks: LocalBookmarks.getAll(),
  bkFormAction: 'add',
  showFormModal: false,
  timeZone: TimeService.getSystemTimeZone(),
  searchEngineName: localStorage.getItem('search-engine') || 'google',

  setBookmarks: action((state, bookmarks) => {
    state.bookmarks = bookmarks;
  }),
  setShowFormModal: action((state, showFormModal) => {
    state.showFormModal = !showFormModal;
  }),

  setTimeZone: action((state, nTimeZone) => {
    if (TimeService.isValidTimeZone()) {
      state.timeZone = nTimeZone;
      localStorage.setItem('time-zone', nTimeZone);
    }
  }),

  setSearchEngineName: action((state, searchEngine) => {
    state.searchEngineName = searchEngine;
    localStorage.setItem('search-engine', searchEngine);
  }),
  ...bkCrud
};

const storeModel = {
  bkModel
};


export default storeModel;