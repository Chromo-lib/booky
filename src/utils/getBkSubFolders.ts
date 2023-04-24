import getBkFolder from "./getBkFolder";

export default async function getBkSubFolders() {
  const bookmarksFolder = await getBkFolder();
  return bookmarksFolder?.children?.filter(t => t.children);
}