import React from 'react';
import styled from 'styled-components';

const Smurf = props => {
  return (
    <StyledSmurf>
      <h3>{props.name}</h3>
      <p>{props.height} tall</p>
      <p>{props.age} smurf years old</p>
    </StyledSmurf>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

const StyledSmurf = styled.div`
  width: 40%;
  padding-bottom: 15px;
  border: 3px solid black;
  margin-bottom: 20px;
  background: #b3e3f3;


`;

export default Smurf;

