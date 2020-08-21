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
      <input type="text" name="timezone" className="w-100 mb-10" placeholder="Africa/Tunis, America/New_York" required />
      <button type="submit" className="w-100">change time zone</button>
    </form>
  );
}