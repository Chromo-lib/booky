export default function onToggleSidebar() {
  const nav = document.querySelector('.nav')
  if (nav?.classList.contains('nav-open')) nav?.classList.remove('nav-open')
  else nav?.classList.add('nav-open')
}