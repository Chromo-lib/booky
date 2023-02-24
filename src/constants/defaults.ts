const modalEL = document.querySelector<HTMLDivElement>('.modal')!;
const defaultAppsEL = document.getElementById('default-apps')! as HTMLDivElement;

const gridBookmarksEL = document.querySelector<HTMLDivElement>('.grid')!;
const messageEL = document.querySelector<HTMLDivElement>('.message')!;

const formCrudBookmarkEL = document.getElementById('form-bookmark')!;
const formSettingsEL = document.getElementById('form-settings')!;
const formChangeBgEL = document.getElementById('form-change-bg')!;
const formSearchEL = document.getElementById('form-search')!;

const dateEL = document.getElementById('date')!;
const timeEL = document.getElementById('time')!;

const btnDeleteBookmarkEL = document.getElementById('btn-delete-bk')! as HTMLButtonElement;
const btnResetSettingsEL = document.getElementById('btn-reset-settings')! as HTMLButtonElement;


export {
  modalEL,
  gridBookmarksEL,
  btnDeleteBookmarkEL,
  timeEL,
  dateEL,
  formChangeBgEL,
  formCrudBookmarkEL,
  formSearchEL,
  formSettingsEL,
  btnResetSettingsEL,
  messageEL,
  defaultAppsEL
}