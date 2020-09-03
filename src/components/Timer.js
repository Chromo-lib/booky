import React, { useState, useEffect } from 'react';
import TimeService from '../services/TimeService';
import { useStoreState } from 'easy-peasy';

export default function Timer () {

  const timeZone = useStoreState(state => state.bkModel.timeZone);
  const [state, setState] = useState(TimeService.native(timeZone));
  
  useEffect(() => {
      setInterval(() => {
        const { date, time } = TimeService.native(timeZone);
        setState({ time, date });
      }, 1000*20);
  }, [timeZone]);

  return (<>
    {state && <div className="txt-uppercase lsp2">
      <small>{new Date(state.date).toDateString()}</small>
      <h1>{state.time}</h1>
    </div>}
  </>);
}