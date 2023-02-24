import gridItem from "../components/gridItem";
import { formCrudBookmarkEL } from "../constants/defaults";
import store from "../store";
import getFormData from "../utils/getFormData";
import onToggleModal from "./onToggleModal";

export default async function onFormCrudBk(e: any) {
  e.preventDefault();

  const grid = store.getState().grid;
  const bookmarksFolder = store.getState().bookmarksFolder;
  const isAddOp = formCrudBookmarkEL.querySelector('button[type="submit"]')!.textContent === 'Add';

  const formData = getFormData<{ id: string, title: string, url: string }>(e.target);

  if (bookmarksFolder) {
    if (isAddOp) {
      const bk = await chrome.bookmarks.create({ url: formData.url, title: formData.title, parentId: bookmarksFolder.id });
      grid.add(gridItem(bk.title, formData.title, bk.id));
    }
    else {
      chrome.bookmarks.update(formData.id, { url: formData.url, title: formData.title });
      grid.getItems().forEach((it, i) => {
        if (it.getElement()?.dataset.id === formData.id) {
          grid.getItem(i)!.getElement()!.querySelector('p')!.textContent = formData.title;
          grid.refreshItems()
          grid.synchronize();
          return
        }
      });
    }

    onToggleModal()
  }
}