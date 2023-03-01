const dapps = [
  { title: 'outlook', url: 'https://outlook.com' },
  { title: 'onedrive', url: 'https://onedrive.live.com' },
  { title: 'excel', url: 'https://www.office.com/launch/excel' },
  { title: 'word', url: 'https://www.office.com/launch/word' },
  { title: 'gmail', url: 'https://mail.google.com/' },
  { title: 'google news', url: 'https://news.google.com' },
  { title: 'google drive', url: 'https://drive.google.com' },
  { title: 'google maps', url: 'https://maps.google.com' },
  { title: 'google translate', url: 'https://translate.google.com' },
  { title: 'google calendar', url: 'https://www.google.com/calendar' },
  { title: 'google meet', url: 'https://meet.google.com' },
  { title: 'talk brave', url: 'https://talk.brave.com/widget' }
];

export default function loadDefaultApps(isVisible: boolean) {

  const btn = document.querySelector('a[href="#default-apps"]')! as HTMLAnchorElement;
  const divEL = document.getElementById('default-apps')!;

  divEL.classList[isVisible ? 'remove' : 'add']('d-none');
  btn.classList[isVisible ? 'remove' : 'add']('d-none');

  if (isVisible) {
    const ulEL = divEL!.querySelector('ul')

    dapps.forEach(site => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = site.url;
      a.textContent = site.title;
      a.rel = "noopener noreferrer"
      a.target = "_blank"
      li.appendChild(a)
      ulEL?.appendChild(li)
    });
  }
}