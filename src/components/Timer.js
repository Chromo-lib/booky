import React, { useState, useEffect } from 'react';

const getD = new Date();

export default function Timer () {

  const [state, setState] = useState({ time: getD.toLocaleTimeString(), date: getD.toDateString() });

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setState({ time: date.toLocaleTimeString(), date: date.toDateString() });
    }, 1000);
  }, []);

  return (<>
    {state && <div className="txt-uppercase lsp2">
      <small>{state.date}</small>
      <h1>{state.time}</h1>
    </div>}
  </>);
}