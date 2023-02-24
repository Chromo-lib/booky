import store from "../store";
import onToggleModal from "./onToggleModal";
import { formCrudBookmarkEL } from "../constants/defaults";

export default function onDeleteBk() {
  const grid = store.getState().grid;
  const idInput = formCrudBookmarkEL?.querySelector('input[name="id"]')! as HTMLInputElement;

  if (window.confirm('Are you sure you want to delete') && grid && idInput) {

    grid.getItems().forEach((it, i) => {
      if (it.getElement()?.dataset.id === idInput.value) {
        chrome.bookmarks.remove(idInput.value);

        if (grid.getItem(i)) {
          grid.remove([grid.getItem(i)!], { removeElements: true });
          grid.refreshItems()
          grid.synchronize();
        }

        onToggleModal();
      }
    });
  }
}