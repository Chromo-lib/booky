import React, { useState, useEffect } from 'react';

const getD = new Date();

export default function Timer () {

  const [state, setState] = useState({
    time: getD.toISOString().split('T')[1].slice(0, 8),
    date: getD.toDateString()
  });

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setState({
        time: date.toISOString().split('T')[1].slice(0, 8),
        date: date.toDateString()
      })
    }, 1000);
  }, []);

  return (<>
    {state && <div className="txt-uppercase lsp2">
      <small>{state.date}</small>
      <h1>{state.time}</h1>
    </div>}
  </>);
}