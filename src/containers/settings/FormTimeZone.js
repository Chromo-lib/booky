import React from 'react';
import { useStoreActions } from 'easy-peasy';

export default function FormTimeZone () {

  const setSettings = useStoreActions(actions => actions.SettingsModel.setSettings);

  const onSetZone = (e) => {
    e.preventDefault();
    setSettings({ prop: 'timeZone', value: e.target.elements[0].value });
    e.target.elements[0].value = '';
  }

  return (
    <form onSubmit={onSetZone}>
      <label><svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 384 512"><path fill="#fff" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" /></svg>change time zone</label>
      <input type="text" name="timezone" className="w-100 mb-10" placeholder="Africa/Tunis, America/New_York" required />
      <button type="submit" className="w-100"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>change</button>
    </form>
  );
}