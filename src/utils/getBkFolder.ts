export default async function getBkFolder(): Promise<chrome.bookmarks.BookmarkTreeNode | null> {
  try {
    let bookmarksFolder = null
    const tree = await chrome.bookmarks.getTree();
    const children = await chrome.bookmarks.getSubTree(tree[0]!.children![0].id);

    if (children.length > 0) {
      bookmarksFolder = children[0]!.children!.find(b => b.title === 'booky');
      if (bookmarksFolder === undefined) bookmarksFolder = await chrome.bookmarks.create({ parentId: tree[0]!.children![0].id, title: 'booky' });
    }

    return bookmarksFolder
  } catch (error) {
    return null
  }
}