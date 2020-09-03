import { action } from 'easy-peasy';
import LocalBookmarks from '../utils/LocalBookmarks';
import SettingsModel from './SettingsModel';

if (localStorage.getItem('wallpaper')) {
  let wallpaper = localStorage.getItem('wallpaper');
  document.body.style.background = `linear-gradient(135deg,rgb(33 37 41 / 73%),rgb(33 37 41 / 88%)),url(data:image/png;base64,${wallpaper})`;
}

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