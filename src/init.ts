import { formChangeBgEL, formSearchEL, formSettingsEL, gridBookmarksEL } from './constants/defaults';
import setTabBg from './utils/setTabBg';
import loadToSites from './utils/loadToSites';
import loadDefaultApps from './utils/loadDefaultApps';

import './styles/sidebar.css';
import './styles/modal.css';
import './styles/style.css';

export default function init(settings: any, bgOptions: any) {
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

  loadToSites(settings.showTopSites)
  loadDefaultApps(settings.showDefaultApp)

  gridBookmarksEL.classList[settings.showBookmarks ? 'remove' : 'add']('d-none');
  formSearchEL.classList[settings.showSearchEngine ? 'remove' : 'add']('d-none');

  setTabBg(bgOptions);
}