export default async function loadToSites(isVisible: boolean) {

  const btn = document.querySelector('a[href="#topsites"]')! as HTMLAnchorElement;
  const ulEL = document.querySelector('#topsites ul')! as HTMLUListElement;

  ulEL.classList[isVisible ? 'remove' : 'add']('d-none');
  btn.classList[isVisible ? 'remove' : 'add']('d-none');

  if (isVisible) {
    const topsites = await chrome.topSites.get();

    topsites.forEach(site => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = site.url;
      a.textContent = site.title;
      a.rel = "noopener noreferrer"
      li.appendChild(a)
      ulEL?.appendChild(li)
    });
  }
}