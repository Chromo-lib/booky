import { defaultAppsEL } from "../constants/defaults";

export default function onModalApps(e: any) {

  const ul = defaultAppsEL.querySelector('ul')!;

  if ((['svg', 'path'].includes(e.target.nodeName) || e.target.id === 'btn-open-default-apps') && ul.classList.contains('d-none')) {
    ul.classList.remove('d-none')
  }
  else {
    ul.classList.add('d-none')
  }
}