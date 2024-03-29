import getBrowserName from "./getBrowserName";

export default function faviconURL(u: string, size = "64") {
  if (getBrowserName() === 'chrome') {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", size);
    return url.toString();
  }

  const origin = new URL(u).origin.replace('https://', '');
  return 'https://www.google.com/s2/favicons?sz=64&domain_url=' + origin;
}
