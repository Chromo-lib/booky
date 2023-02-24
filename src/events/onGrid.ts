import { formCrudBookmarkEL, modalEL } from "../constants/defaults";
import store from "../store";
import getBkFolder from "../utils/getBkFolder";


export default async function onGrid(e: any) {
  const target = e.target;

  if (['BUTTON', 'svg', 'path'].includes(target.nodeName)) {

    const id = target.dataset.id || target.parentElement.dataset.id;

    const bookmarksFolder = await getBkFolder();

    if (bookmarksFolder && bookmarksFolder.children) {

      store.actions.setbookmarksFolder(bookmarksFolder);

      const bk = bookmarksFolder.children.find((bk: any) => bk.id === id);

      const titlenput = formCrudBookmarkEL.querySelector<HTMLInputElement>('input[name="title"]')!;
      const urlnput = formCrudBookmarkEL.querySelector<HTMLInputElement>('input[name="url"]')!;
      const idInput = formCrudBookmarkEL.querySelector<HTMLInputElement>('input[name="id"]')!;

      titlenput.value = bk?.title || '';
      urlnput.value = bk?.url || '';
      idInput.value = bk?.id || '';

      if (titlenput.value.length > 0) {
        modalEL.style.display = 'flex'
        formCrudBookmarkEL.querySelector('button[type="submit"]')!.textContent = 'Update';
      }
    }
  }
}