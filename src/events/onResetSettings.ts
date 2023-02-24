export default function onResetSettings() {
  if (window.confirm('Do you really want to reset settings?')) {
    localStorage.clear()
    window.location.reload()
  }
}