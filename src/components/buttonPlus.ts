import { formCrudBookmarkEL, modalEL } from "../constants/defaults";

export default function buttonPlus() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `<img src="/plus-lg.svg" alt="add" /><p></p>`;

  wrapper.ondblclick = () => {    
    formCrudBookmarkEL.querySelectorAll('input').forEach(input => input.value = '');
    formCrudBookmarkEL!.querySelector('button[type="submit"]')!.textContent = 'Add';
    modalEL!.style.display = 'flex'
  }

  wrapper.title = "Double click to add new bookmark"
  wrapper.classList.add('item', 'h-align')
  return wrapper
}
