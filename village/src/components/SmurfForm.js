import React from 'react';
import styled from 'styled-components';

function SmurfForm({ inputNameRef, inputAgeRef, inputHeightRef, postSmurf, deleteSmurf, updateSmurf, selected, updateSelected, smurfs }) {
  return (
    <StyledForm>
      <select name="smurfs" value={selected} onChange={e => updateSelected(e.target.value)}>
          <option value="" >Choose a smurf</option>
          {
              smurfs.map(smurf => 
                  <option key={smurf.id} value={smurf.id}>{smurf.name}</option>    
              )
          }
      </select>
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
      <input type="button" onClick={postSmurf} value="Add to the village" /> 
      <input type="button" onClick={() => deleteSmurf(selected)} value="Delete Smurf" />
      <input type="button" onClick={() => updateSmurf(selected)} value="Update Smurf" />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  select {
    text-align-last:center;
  }
  input {
    margin-top: 10px;
    &::placeholder {
      text-align: center;
    }
  }
`;

export default SmurfForm;
