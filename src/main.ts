import Muuri from 'muuri'
import buttonPlus from './components/buttonPlus';
import gridItem from './components/gridItem';
import defaultBks from './utils/defaultBks';
import onAddOrUpdate from './events/onAddOrUpdate';
import onDeleteBk from './events/onDeleteBk';
import onDrag from './events/onDrag';
import onGrid from './events/onGrid';
import onToggleModal from './events/onToggleModal';
import store from './store';
import getBkFolder from './utils/getBkFolder';
import onSwap from './events/onSwap';
import { btnDeleteBookmarkEL, btnResetSettingsEL, defaultAppsEL, formChangeBgEL, formCrudBookmarkEL, formSearchEL, formSettingsEL, gridBookmarksEL } from './constants/defaults';
import setDateAndTime from './utils/setDateAndTime';
import onChangeBg from './events/onChangeBg';
import onToggleSidebar from './events/onToggleSidebar';
import onSearch from './events/onSearch';
import onResetSettings from './events/onResetSettings';
import setTabBg from './utils/setTabBg';
import onSettings from './events/onSettings';
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
console.log(settings);

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

    grid.on('dragMove', onDrag);
    grid.on('dragEnd', onDrag);
    grid.on('move', onSwap);
    gridBookmarksEL?.addEventListener('click', onGrid);
    btnDeleteBookmarkEL.addEventListener('click', onDeleteBk)
    formCrudBookmarkEL.addEventListener('submit', onAddOrUpdate)
  }

  formSettingsEL.addEventListener('submit', onSettings, false);
  formChangeBgEL.addEventListener('submit', onChangeBg, false);
  formSearchEL.addEventListener('submit', onSearch, false);

  defaultAppsEL.addEventListener('click', onModalApps, false);
  btnResetSettingsEL.addEventListener('click', onResetSettings);
  document.querySelector('.nav__toggle')?.addEventListener('click', onToggleSidebar);
  document.querySelector('.btn-close-modal')?.addEventListener('click', onToggleModal);
}

const onbeforeunload = () => {
  if (settings.showBookmarks) {
    const grid: Muuri = store.getState().grid;
    grid.off('dragMove', onDrag);
    grid.off('dragEnd', onDrag);
    grid.off('move', onSwap);
    gridBookmarksEL?.removeEventListener('click', onGrid);
    btnDeleteBookmarkEL.removeEventListener('click', onDeleteBk);
    formCrudBookmarkEL.removeEventListener('submit', onAddOrUpdate);
  }

  clearInterval(idTimer)

  formSearchEL.removeEventListener('submit', onSearch);
  formChangeBgEL.removeEventListener('submit', onChangeBg);
  defaultAppsEL.removeEventListener('click', onModalApps);
  document.querySelector('.nav__toggle')?.removeEventListener('click', onToggleSidebar);
  document.querySelector('.btn-close-modal')?.removeEventListener('click', onToggleModal)

  document.removeEventListener('DOMContentLoaded', onLoad);
}

document.addEventListener('DOMContentLoaded', onLoad);
window.addEventListener("beforeunload", onbeforeunload);
