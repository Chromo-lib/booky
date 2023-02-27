export default function onToggleSidebar() {
  const sidebar = document.querySelector('.sidebar')
  if (sidebar?.classList.contains('sidebar-open')) sidebar?.classList.remove('sidebar-open')
  else sidebar?.classList.add('sidebar-open')
}