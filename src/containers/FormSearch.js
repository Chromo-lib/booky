import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import '../styles/DropDown.css';

const searchEngines = ['Google', 'Bing', 'Yandex', 'Duckduckgo', 'Yahoo'];

export default function FormSearch () {

  const searchEngineName = useStoreState(state => state.SettingsModel.searchEngineName);
  const setSettings = useStoreActions(actions => actions.SettingsModel.setSettings);
  const [inputSearch, setInputSearch] = useState('');
  const [showDrop, setShowDrop] = useState(false);

  const onChooseSearchEngine = (sEng) => {
    setSettings({ prop: 'searchEngineName', value: sEng });
    setShowDrop(false);
  }

  const onSearch = (e) => {
    e.preventDefault();
    switch (searchEngineName) {
      case 'Bing':
        window.location.href = 'https://bing.com/search?q=' + inputSearch;
        break;

      case 'Yandex':
        window.location.href = 'https://yandex.com/search/?text=' + inputSearch + '&lang=en';
        break;

      case 'Duckduckgo':
        window.location.href = 'https://duckduckgo.com/?q=' + inputSearch + '&t=hv&ia=web';
        break;

      case 'Yahoo':
        window.location.href = 'https://search.yahoo.com/search?p=' + inputSearch;
        break;

      default:
        window.location.href = 'https://www.google.com/search?q=' + inputSearch;
        break;
    }
  }

  return (
    <form className="w-60 d-flexi form-search mb-10" onSubmit={onSearch}>

      <div className="dropdown">
        <button type="button" className="dd-button" onClick={() => { setShowDrop(!showDrop); }}>
          <img src={`search/${searchEngineName}.png`}
            alt="search engine" width="25" height="25" className="mr-5" /> {searchEngineName}
        </button>
        <ul className="dd-menu" style={{ display: showDrop ? 'block' : 'none' }}>
          {searchEngines.map(s => <li key={s} onClick={() => { onChooseSearchEngine(s); }}>
            <img src={`search/${s}.png`}
              alt="search engine" width="15" height="15" className="mr-5" /> {s}
          </li>)}
        </ul>
      </div>

      <input
        type="text"
        name="isearch"
        onChange={(e) => { setInputSearch(e.target.value) }}
        value={inputSearch}
        placeholder="Search the web.."
        required
      />

      <button type="submit" className="btn-search"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 512 512"><path fill="#000" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg></button>
    </form>
  );
}