import { action } from 'easy-peasy';
import LocalBookmarks from '../utils/LocalBookmarks';
import SettingsModel from './SettingsModel';

const bkModel = {
  bookmarks: LocalBookmarks.getAll(),
  bkFormAction: 'add',
  showFormModal: false,

  setBookmarks: action((state, bookmarks) => {
    state.bookmarks = bookmarks;
  }),
  setShowFormModal: action((state, showFormModal) => {
    state.showFormModal = !showFormModal;
  }),
  onRemoveBookmark: action((state, bk) => {
    let c = window.confirm("Are you sure you wish to delete? " + bk.title);
    if (c) {
      let newBookmarks = state.bookmarks.filter(b => b.id !== bk.id);
      state.bookmarks = newBookmarks;
      LocalBookmarks.replaceAll(newBookmarks);
    }
  }),
};

const storeModel = { bkModel, SettingsModel };

export default storeModel;