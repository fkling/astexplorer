import React from 'react';

export default function SettingsRenderer(props) {
  const {settings, values, required=new Set(), onChange} = props;
  return (
    <ul className="settings">
      {settings.map(setting => {
        if (typeof setting === 'string') {
          return (
            <li key={setting}>
              <label>
                <input
                  type="checkbox"
                  readOnly={required.has(setting)}
                  disabled={required.has(setting)}
                  defaultChecked={values[setting]}
                  onChange={onChange.bind(null, setting)}
                />
                &nbsp;{setting}
              </label>
            </li>
          );
        } else if(Array.isArray(setting)) {
          let [name, options] = setting;
          return (
            <li key={name}>
              <label>
                {name}:&nbsp;
                <select
                  onChange={onChange.bind(null, name)}
                  defaultValue={values[name]}>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
            </li>
          );
        }
      })}
    </ul>
  );
}
