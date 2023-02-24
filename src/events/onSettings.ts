import store from "../store";

export default function onSettings(e: any) {
  e.preventDefault()

  const searchEngine = e.target.elements[0].value;
  const showDate = e.target.elements[1].checked;
  const showTime = e.target.elements[2].checked;
  const showBookmarks = e.target.elements[3].checked;
  const showSearchEngine = e.target.elements[4].checked;
  const showDefaultApp = e.target.elements[5].checked;

  store.actions.setSettings({ showDefaultApp, searchEngine, showSearchEngine, showBookmarks, showDate, showTime });

  window.location.reload();
}