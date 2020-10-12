import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import TimeZonesService from '../../services/TimeZonesServices';
import InputSelect from '../../components/InputSelect';

export default function FormTimeZone () {

  const setSettings = useStoreActions(actions => actions.SettingsModel.setSettings);
  const [timezones, setTimezones] = useState(null);
  const [zone, setZone] = useState('Africa/Tunis');

  useEffect(() => {
    TimeZonesService()
      .then(tzones => {
        setTimezones(tzones.map(z => z.name));
      })
      .catch(e => { });
  }, []);

  const onSelectItem = (tzone) => {
    setZone(tzone);
  }

  const onSetZone = (e) => {
    e.preventDefault();
    setSettings({ prop: 'timeZone', value: zone });
  }

  return (
    <form onSubmit={onSetZone}>

      {timezones && <InputSelect label="Time zone" data={timezones} onSelectItem={onSelectItem} placeholder="time zone.." />}

      <button type="submit" className="w-100 mt-10"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>change
       </button>
    </form>
  );
}