import Muuri from 'muuri'
import buttonPlus from './components/buttonPlus';
import gridItem from './components/gridItem';
import defaultBks from './utils/defaultBks';
import onFormCrudBk from './events/onFormCrudBk';
import onDeleteBk from './events/onDeleteBk';
import onDragGridItem from './events/onDragGridItem';
import onGrid from './events/onGrid';
import onToggleModal from './events/onToggleModal';
import store from './store';
import getBkFolder from './utils/getBkFolder';
import onSwapGirdItem from './events/onSwapGirdItem';
import { btnDeleteBookmarkEL, btnResetBgOptionsEL, btnResetSettingsEL, defaultAppsEL, formChangeBgEL, formCrudBookmarkEL, formSearchEL, formSettingsEL, gridBookmarksEL } from './constants/defaults';
import setDateAndTime from './utils/setDateAndTime';
import onFormBg from './events/onFormBg';
import onToggleSidebar from './events/onToggleSidebar';
import onFormSearch from './events/onFormSearch';
import onReset from './events/onReset';
import setTabBg from './utils/setTabBg';
import onFormSettings from './events/onFormSettings';
import onModalApps from './events/onModalApps';

import './sidebar.css';
import './default-apps.css';
import './style.css';

let idTimer: any;
const settings: any = store.getState().settings;
const bgOptions: any = store.getState().bgOptions;

function init() {
  idTimer = setDateAndTime(settings);

  formSettingsEL.querySelectorAll('input[type="checkbox"]')
    .forEach((el) => {
      const e = (el as HTMLInputElement);
      e.checked = settings[e.name];
    });

  formChangeBgEL.querySelectorAll('input[type="checkbox"]')
    .forEach((el) => {
      const e = (el as HTMLInputElement);
      e.checked = bgOptions[e.name];
    });

  if (settings.showSearchEngine === true) {
    const select = formSettingsEL.querySelector('select')! as HTMLSelectElement;
    select.value = settings.searchEngine;
    formSearchEL.querySelector('input')!.placeholder! = settings.searchEngine;
  }

  defaultAppsEL.classList[settings.showDefaultApp ? 'remove' : 'add']('d-none');
  gridBookmarksEL.classList[settings.showBookmarks ? 'remove' : 'add']('d-none');
  formSearchEL.classList[settings.showSearchEngine ? 'remove' : 'add']('d-none');

  setTabBg(bgOptions);
}

init();

const onLoad = async () => {
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

  formSettingsEL.addEventListener('submit', onFormSettings, false);
  formChangeBgEL.addEventListener('submit', onFormBg, false);
  formSearchEL.addEventListener('submit', onFormSearch, false);

  btnResetSettingsEL.addEventListener('click', onReset);
  btnResetBgOptionsEL.addEventListener('click', onReset);

  defaultAppsEL.addEventListener('click', onModalApps, false);
  document.querySelector('.nav__toggle')?.addEventListener('click', onToggleSidebar);
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
  defaultAppsEL.removeEventListener('click', onModalApps);
  document.querySelector('.nav__toggle')?.removeEventListener('click', onToggleSidebar);
  document.querySelector('.btn-close-modal')?.removeEventListener('click', onToggleModal)

  document.removeEventListener('DOMContentLoaded', onLoad);
}

document.addEventListener('DOMContentLoaded', onLoad);
window.addEventListener("beforeunload", onbeforeunload);
