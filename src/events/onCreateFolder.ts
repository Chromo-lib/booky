import getBkFolder from "../utils/getBkFolder";

export default async function onCreateFolder(e: any) {
  e.preventDefault();
  const title = e.target.elements[0].value.trim();
  const bookmarksFolder = await getBkFolder();
  await chrome.bookmarks.create({ parentId: bookmarksFolder!.id, title });

  e.target.reset()
}