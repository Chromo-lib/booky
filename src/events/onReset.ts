export default function onReset(e: any) {
  if (window.confirm('Do you really want to reset?')) {
    if (e.target.id.includes('settings')) localStorage.removeItem('settings')
    else localStorage.removeItem('bgOptions')
  }
  window.location.reload()
}