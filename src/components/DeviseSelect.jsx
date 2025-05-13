import React from 'react';

function DeviseSelect({ value, onChange, deviseList, label }) {
  const deviseOptions = deviseList.map((devise) => (
    <option key={devise.value} value={devise.value}>
      {devise.name}
    </option>
  ));

  return (
    <>
      <h2>{label}</h2>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {deviseOptions}
      </select>
    </>
  );
}

export default DeviseSelect;