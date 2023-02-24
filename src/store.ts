import { createStore } from 'staten';
import Muuri from 'muuri'
import { IBgOptions, ISettings, IState } from './types';

const localbgOptionss = localStorage.getItem('bgOptions') || '{}';
let localSettings = localStorage.getItem('settings') || '{}';

let grid: Muuri = new Muuri('.grid', {
  dragEnabled: true,
  dragStartPredicate: function (item, event) {
    // Prevent first item from being dragged. 
    if (grid.getItems().indexOf(item) === 0) {
      return false;
    }
    // For other items use the default drag start predicate.
    return Muuri.ItemDrag.defaultStartPredicate(item, event);
  },
  // @ts-ignore: Unreachable code error
  dragSortPredicate: (item) => {
    const result = Muuri.ItemDrag.defaultSortPredicate(item, { action: 'swap', threshold: 50 });
    return result && result.index === 0 ? false : result;
  }
});

const initialState: IState = {
  grid,
  bookmarksFolder: undefined,
  message: null,
  settings: {
    showDate: true,
    showTime: true,
    showSearchEngine: true,
    showBookmarks: true,
    showTimeZone: true,
    showDefaultApp: true,
    searchEngine: 'Duckduckgo',
    ...JSON.parse(localSettings),
  },
  bgOptions: {
    bg: null,
    image: false,
    widthBlur: true,
    widthFiler: true,
    ...JSON.parse(localbgOptionss)
  }
}

const actions = {
  setbookmarksFolder: (bookmarksFolder: chrome.bookmarks.BookmarkTreeNode) => ({ bookmarksFolder }),

  setBgOptions: (bgOp: IBgOptions) => (state: IState) => {
    const bgOptions = { ...state.bgOptions, ...bgOp };
    localStorage.setItem('bgOptions', JSON.stringify(bgOptions))
    return { bgOptions }
  },
  setSettings: (s: ISettings) => (state: IState) => {
    const settings = { ...state.settings, ...s };
    localStorage.setItem('settings', JSON.stringify(settings));
    return { settings }
  },
  setMessage: (message: string) => ({ message }),
};

const store = createStore(actions, initialState);

export default store;