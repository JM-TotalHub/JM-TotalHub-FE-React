import React from 'react';

const UndeadSurvivor = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '66vw',
        height: '80vh',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <iframe
        src="/game/undead-survivor/index.html"
        title="Undead Survivor"
        style={{
          width: '60%',
          height: '90%',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
};

export default UndeadSurvivor;
