import React from 'react';
import FormTimeZone from './FormTimeZone';
import FormImageBG from './FormImageBG';
import Switch from '../../components/Switch';
import Sidebar from '../../components/Sidebar';

function SpanIcon ({ title }) {
  return <span className="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>{title}</span>
}

export default function Settings ({ SettingsModel, onSettingsChange }) {

  return (
    <Sidebar>
      <ul className="w-100">
        {Object.keys(SettingsModel).map(s => {
          if (s !== 'timeZone' && s !== 'searchEngineName') {
            return <li className="d-flex justify-between mb-10" key={s}>
              <SpanIcon title={s.replace(/([a-z])([A-Z])/g, '$1 $2')} />
              <Switch
                onToggle={() => { onSettingsChange(s); }}
                status={SettingsModel[s]}
              />
            </li>
          }
        })}
      </ul>

      {!SettingsModel.defaultBackground && <FormImageBG />}

      <hr />

      <FormTimeZone />
    </Sidebar>
  );
}