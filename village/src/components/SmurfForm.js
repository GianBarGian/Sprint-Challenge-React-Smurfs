import React, { Component } from 'react';

function SmurfForm({ inputNameRef, inputAgeRef, inputHeightRef, postSmurf}) {
  return (
    <div className="SmurfForm">
      <form onSubmit={e => {
        e.preventDefault();
        postSmurf();
      }}>
        <input
          placeholder="name"
          ref={inputNameRef}
          name="name"
        />
        <input
          placeholder="age"
          ref={inputAgeRef}
          name="age"
        />
        <input
          placeholder="height"
          ref={inputHeightRef}
          name="height"
        />
        <button type="submit">Add to the village</button>
      </form>
    </div>
  );
}

export default SmurfForm;
