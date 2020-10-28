import React, { useState } from 'react';
import '../styles/InputSelect.css';

export default function InputSelect ({ label, data, placeholder, onSelectItem }) {

  const [state, setState] = useState({ showItems: false, data, tmpData: data });

  const [searchVal, setSearchVal] = useState('');

  const onSearch = (e) => {
    let val = e.target.value.toLowerCase();
    let data = state.tmpData.filter(d => d.toLowerCase().includes(val));
    setState({ ...state, data: data.length > 0 ? data : state.tmpData });
    setSearchVal(val);
  }

  const toggleItems = () => {
    setState({ ...state, showItems: !state.showItems });
  }

  const onItem = (val) => {
    onSelectItem(val);
    setSearchVal(val);
    toggleItems();
  }

  return (<div className="w-100 input-select">

    <label><svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 384 512"><path fill="#fff" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" /></svg>{label}</label>

    <input
      type="search"
      onClick={toggleItems}
      onChange={onSearch}
      value={searchVal}
      placeholder={placeholder}
    />

    <ul className={"w-100 " + (state.showItems ? "disp-block" : "disp-none")}>
      {state.data.map(d => <li key={d} 
      onClick={() => { onItem(d); }}
      className={"w-100 " + (state.showItems ? "c-bleu" : "")}>{d}</li>)}
    </ul>

  </div>);
}