export default function faviconURL(u: string) {
  try {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "64");
    return url.toString();
  } catch (error) {
    const origin = new URL(u).origin.replace('https://', '');
    return 'https://www.google.com/s2/favicons?sz=64&domain_url=' + origin;
  }
}