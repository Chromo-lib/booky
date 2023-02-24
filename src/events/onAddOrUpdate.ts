import gridItem from "../components/gridItem";
import { formCrudBookmarkEL } from "../constants/defaults";
import store from "../store";
import onToggleModal from "./onToggleModal";

export default async function onAddOrUpdate(e: any) {
  e.preventDefault();

  const grid = store.getState().grid;
  const bookmarksFolder = store.getState().bookmarksFolder;
  const isAddOp = formCrudBookmarkEL.querySelector('button[type="submit"]')!.textContent === 'Add';

  let id = e.target.elements[0].value;
  let title = e.target.elements[1].value;
  let url = e.target.elements[2].value;

  if (bookmarksFolder) {
    if (isAddOp) {
      const bk = await chrome.bookmarks.create({ title, url, parentId: bookmarksFolder.id });
      grid.add(gridItem(bk.title, url, bk.id));
    }
    else {
      chrome.bookmarks.update(id, { url, title });
      grid.getItems().forEach((it, i) => {
        if (it.getElement()?.dataset.id === id) {
          grid.getItem(i)!.getElement()!.querySelector('p')!.textContent = title;
          grid.refreshItems()
          grid.synchronize();
          return
        }
      });
    }

    onToggleModal()
  }
}