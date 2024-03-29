import store from "../store";
import { IBgOptions } from "../types";

export default function setTabBg(bgOptions: IBgOptions) {
  store.actions.setBgOptions(bgOptions)

  const base64String = localStorage.getItem('wallpaper');

  if (base64String && bgOptions && bgOptions.image) {
    document.body.style.background = bgOptions.widthFiler
      ? `linear-gradient(135deg,rgb(33 37 41 / 65%),rgb(33 37 41 / 72%)),url(data:image/png;base64,${base64String}) no-repeat center center fixed`
      : `url(data:image/png;base64,${base64String}) no-repeat center center fixed`;
  }

  if (bgOptions && bgOptions.widthBlur) document.body.classList.add('backdrop-blur');
  else document.body.classList.remove('backdrop-blur');
}