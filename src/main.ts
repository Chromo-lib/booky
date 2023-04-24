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
  formCreateFolder,
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
import onCreateFolder from './events/onCreateFolder';
import getBkSubFolders from './utils/getBkSubFolders';
import faviconURL from './utils/faviconURL';

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
        if (!t.children) grid.add(gridItem(t.title, t.url || '', t.id || '0'))
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

    const subFolders = await getBkSubFolders();
    const section = document.querySelector('section');

    if (section && subFolders && subFolders.length > 0) {
      subFolders?.forEach(b => {
        const details = document.createElement('details');
        const ul = document.createElement('ul');

        details.innerHTML += `
        <summary class="d-flex align-center br8">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
            <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
            <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
          </svg>
        ${b.title} (${b.children?.length})
        </summary>`;

        b.children?.forEach(v => {
          if(!v.children) ul.innerHTML += `<li class="d-flex align-center border-bottom">
          <img class="mr-2 rounded" width="20" height="20" src="${faviconURL(v.url as string)}" alt="${v.title}" />  
          <a href="${v.url}" title="${v.title}" target="_blank">${v.title}</a>
          </li>`
        })

        details.classList.add('mb-2', 'mr-2', 'br8');
        details.appendChild(ul)
        section.appendChild(details)
      });
    }

    gridBookmarksEL?.addEventListener('click', onGrid);
    btnDeleteBookmarkEL.addEventListener('click', onDeleteBk)
    formCrudBookmarkEL.addEventListener('submit', onFormCrudBk)
    formCreateFolder.addEventListener('submit', onCreateFolder);
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

  formCreateFolder.removeEventListener('submit', onCreateFolder);
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
