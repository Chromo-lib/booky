import React from 'react';
import { useStoreActions } from 'easy-peasy';

export default function FormTimeZone () {
  
  const { setTimeZone } = useStoreActions(actions => actions.bkModel);

  const onSetZone = (e) => {
    e.preventDefault();
    setTimeZone(e.target.elements[0].value);
    e.target.elements[0].value = '';
  }

  return (
    <form onSubmit={onSetZone}>
      <label><svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 384 512"><path fill="#fff" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg> time zone</label>
      <input type="text" name="timezone" className="w-100 mb-10" placeholder="Africa/Tunis, America/New_York" required />
      <button type="submit" className="w-100">change time zone</button>
    </form>
  );
}