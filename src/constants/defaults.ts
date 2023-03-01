const modalEL = document.querySelector<HTMLDivElement>('.modal')!;

const gridBookmarksEL = document.querySelector<HTMLDivElement>('.grid')!;
const messageEL = document.querySelector<HTMLDivElement>('.message')!;

const formCrudBookmarkEL = document.getElementById('form-bookmark')!;
const formSettingsEL = document.getElementById('form-settings')!;
const formChangeBgEL = document.getElementById('form-change-bg')!;
const formSearchEL = document.getElementById('form-search')!;

const dateEL = document.getElementById('date')!;
const timeEL = document.getElementById('time')!;
const timeZoneEL = document.getElementById('timezone')!;

const btnDeleteBookmarkEL = document.getElementById('btn-delete-bk')! as HTMLButtonElement;
const btnResetSettingsEL = document.getElementById('btn-reset-settings')! as HTMLButtonElement;
const btnResetBgOptionsEL = document.getElementById('btn-reset-bgoptions')! as HTMLButtonElement;


export {
  modalEL,
  gridBookmarksEL,
  btnDeleteBookmarkEL,
  timeEL,
  dateEL,
  timeZoneEL,
  formChangeBgEL,
  formCrudBookmarkEL,
  formSearchEL,
  formSettingsEL,
  btnResetSettingsEL,
  messageEL,
  btnResetBgOptionsEL
}