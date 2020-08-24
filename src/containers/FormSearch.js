import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function FormSearch () {

  const searchEngineName = useStoreState(state => state.bkModel.searchEngineName);
  const setSearchEngineName = useStoreActions(actions => actions.bkModel.setSearchEngineName);
  const [inputSearch, setInputSearch] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    switch (searchEngineName) {
      case 'bing':
        window.location.href = 'https://bing.com/search?q=' + inputSearch;
        break;

      case 'yandex':
        window.location.href = 'https://yandex.com/search/?text=' + inputSearch + '&lang=en';
        break;

      case 'duckduckgo':
        window.location.href = 'https://duckduckgo.com/?q=' + inputSearch + '&t=hv&ia=web';
        break;

      default:
        window.location.href = 'https://www.google.com/search?q=' + inputSearch;
        break;
    }
  }

  return (
    <form className="w-60 d-flexi form-search mb-10" onSubmit={onSearch}>

      <select name="sengines" className="w-25"
        onChange={(e) => { setSearchEngineName(e.target.value) }}
        value={searchEngineName}>
        <option value="google">google</option>
        <option value="duckduckgo">duckduckgo</option>
        <option value="yandex">yandex</option>
        <option value="bing">bing</option>
      </select>

      <input className="w-75"
        type="text"
        name="isearch"
        onChange={(e) => { setInputSearch(e.target.value) }}
        value={inputSearch}
        placeholder="Search the web.."
        required
      />

      <button type="submit" className="btn-search"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 512 512"><path fill="#000" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg></button>
    </form>
  );
}