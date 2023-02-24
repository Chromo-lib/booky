import Muuri from 'muuri'

export type ISettings = {
  showDate: boolean
  showTime: boolean
  showSearchEngine: boolean
  showBookmarks: boolean
  showDefaultApp:boolean
  searchEngine: string
}

export type IBgOptions = {
  widthBlur: boolean
  widthFiler: boolean
}

export type IState = {
  grid: Muuri
  bookmarksFolder: chrome.bookmarks.BookmarkTreeNode | undefined
  message: string | null
  settings: ISettings
  bgOptions: IBgOptions
}