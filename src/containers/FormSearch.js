import React from 'react';
import { useStoreState } from 'easy-peasy';

export default function FormSearch () {

  const searchEngineName = useStoreState(state => state.bkModel.searchEngineName);

  const onSearch = (e) => {
    e.preventDefault();

    let inputVal = e.target.elements[0].value;

    switch (searchEngineName) {
      case 'bing':
        window.location.href = 'https://bing.com/search?q=' + inputVal;
        break;

      case 'yandex':
        window.location.href = 'https://yandex.com/search/?text=' + inputVal + '&lang=en';
        break;

      case 'duckduckgo':
        window.location.href = 'https://duckduckgo.com/?q=' + inputVal + '&t=hv&ia=web';
        break;

      default:
        window.location.href = 'https://www.google.com/search?q=' + inputVal;
        break;
    }
  }

  return (
    <form className="w-100 mb-10" onSubmit={onSearch}>
      <input className="w-60" type="search" placeholder={searchEngineName + " search.."} required />
    </form>
  );
}