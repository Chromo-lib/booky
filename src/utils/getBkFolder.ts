export default async function getBkFolder(): Promise<chrome.bookmarks.BookmarkTreeNode | null> {
  let bookmarksFolder = null
  const gettingSubTree = await chrome.bookmarks.getSubTree('1');
  if (gettingSubTree.length > 0) {
    bookmarksFolder = gettingSubTree[0]!.children!.find(b => b.title === 'booky');
    if (bookmarksFolder === undefined) bookmarksFolder = await chrome.bookmarks.create({ parentId: '1', title: 'booky' });
  }

  return bookmarksFolder
}