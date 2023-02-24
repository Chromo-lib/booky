import store from "../store";

export default function onSwap(data: {
  item: Muuri.Item;
  fromIndex: number;
  toIndex: number;
  action: "move" | "swap";
}) {
  if (data && data.item && data.action === 'swap') {
    const grid = store.getState().grid;

    const currentElementID = '' + (data.item.getElement()!.dataset.id);
    const elToReplaceID = '' + (grid.getItem(data.fromIndex)?.getElement()?.dataset.id);

    chrome.bookmarks.move(currentElementID, { index: data.toIndex });
    chrome.bookmarks.move(elToReplaceID, { index: data.fromIndex });
  }
}