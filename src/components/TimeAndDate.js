import React, { useState, useEffect } from 'react';
import TimeService from '../services/TimeService';
import { useStoreState } from 'easy-peasy';

export default function TimeAndDate () {

  const timeZone = useStoreState(state => state.SettingsModel.timeZone);
  const [state, setState] = useState(TimeService.native(timeZone));

  useEffect(() => {
    const interval = setInterval(() => {
      const { date, time } = TimeService.native(timeZone);
      setState({ time, date });
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setState(TimeService.native(timeZone));
  }, [timeZone]);

  return (<>
    {state && <div className="txt-uppercase lsp2">
      <small>{new Date(state.date).toDateString()}</small>
      <h1>{state.time}</h1>
    </div>}
  </>);
}