import { action } from 'easy-peasy';
import LocalBookmarks from '../utils/LocalBookmarks';
import SettingsModel from './SettingsModel';

window.chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) ? window.chrome:window.browser;

const bkModel = {
  bookmarks: LocalBookmarks.getAll(),

  setBookmarks: action((state, bookmarks) => {
    state.bookmarks = bookmarks;
  }),
  setShowFormModal: action((state, showFormModal) => {
    state.showFormModal = !showFormModal;
  })
};

const storeModel = { bkModel, SettingsModel };

export default storeModel;