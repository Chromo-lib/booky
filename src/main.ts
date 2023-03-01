import Muuri from 'muuri'
import buttonPlus from './components/buttonPlus';
import gridItem from './components/gridItem';
import defaultBks from './constants/defaultBks';
import onFormCrudBk from './events/onFormCrudBk';
import onDeleteBk from './events/onDeleteBk';
import onDragGridItem from './events/onDragGridItem';
import onGrid from './events/onGrid';
import onToggleModal from './events/onToggleModal';
import store from './store';
import getBkFolder from './utils/getBkFolder';
import onSwapGirdItem from './events/onSwapGirdItem';
import {
  btnDeleteBookmarkEL, btnResetBgOptionsEL, btnResetSettingsEL, formChangeBgEL, formCrudBookmarkEL,
  formSearchEL, formSettingsEL, gridBookmarksEL
} from './constants/defaults';
import onFormBg from './events/onFormBg';
import onToggleSidebar from './events/onToggleSidebar';
import onFormSearch from './events/onFormSearch';
import onReset from './events/onReset';
import onFormSettings from './events/onFormSettings';
import setDateAndTime from './utils/setDateAndTime';
import init from './init';
import { IBgOptions, ISettings } from './types';

import './styles/sidebar.css';
import './styles/modal.css';
import './styles/style.css';

let idTimer: any;
const settings: ISettings = store.getState().settings;
const bgOptions: IBgOptions = store.getState().bgOptions;

init(settings, bgOptions);

const onLoad = async () => {
  idTimer = setDateAndTime(settings);

  if (settings.showBookmarks) {
    const grid: Muuri = store.getState().grid;
    const bookmarksFolder = await getBkFolder();

    grid.add(buttonPlus());
    store.actions.setbookmarksFolder(bookmarksFolder);

    const len = bookmarksFolder!.children?.length || 0;
    // const topSites = await chrome.topSites.get();

    if (len > 0) {
      bookmarksFolder!.children?.forEach(t => {
        grid.add(gridItem(t.title, t.url || '', t.id || '0'))
      });
    }
    else {
      defaultBks.forEach(async ({ title, url }) => {
        const bk = await chrome.bookmarks.create({ title, url, parentId: bookmarksFolder!.id });
        grid.add(gridItem(bk.title, url, bk.id));
      });
    }

    grid.on('dragMove', onDragGridItem);
    grid.on('dragEnd', onDragGridItem);
    grid.on('move', onSwapGirdItem);
    gridBookmarksEL?.addEventListener('click', onGrid);
    btnDeleteBookmarkEL.addEventListener('click', onDeleteBk)
    formCrudBookmarkEL.addEventListener('submit', onFormCrudBk)
  }

  formSettingsEL.addEventListener<"submit">('submit', onFormSettings, false);
  formChangeBgEL.addEventListener('submit', onFormBg, false);
  formSearchEL.addEventListener('submit', onFormSearch, false);

  btnResetSettingsEL.addEventListener('click', onReset);
  btnResetBgOptionsEL.addEventListener('click', onReset);

  document.querySelector('.sidebar__toggle')?.addEventListener('click', onToggleSidebar);
  document.querySelector('.btn-close-modal')?.addEventListener('click', onToggleModal);
}

const onbeforeunload = () => {
  if (settings.showBookmarks) {
    const grid: Muuri = store.getState().grid;
    grid.off('dragMove', onDragGridItem);
    grid.off('dragEnd', onDragGridItem);
    grid.off('move', onSwapGirdItem);
    gridBookmarksEL?.removeEventListener('click', onGrid);
    btnDeleteBookmarkEL.removeEventListener('click', onDeleteBk);
    formCrudBookmarkEL.removeEventListener('submit', onFormCrudBk);
  }

  clearInterval(idTimer);

  btnResetSettingsEL.removeEventListener('click', onReset);
  btnResetBgOptionsEL.removeEventListener('click', onReset);

  formSearchEL.removeEventListener('submit', onFormSearch);
  formChangeBgEL.removeEventListener('submit', onFormBg);
  document.querySelector('.nav__toggle')?.removeEventListener('click', onToggleSidebar);
  document.querySelector('.btn-close-modal')?.removeEventListener('click', onToggleModal)

  document.removeEventListener('DOMContentLoaded', onLoad);
}

document.addEventListener('DOMContentLoaded', onLoad);
window.addEventListener("beforeunload", onbeforeunload);
