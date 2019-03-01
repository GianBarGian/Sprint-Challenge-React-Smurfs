import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, NavLink } from 'react-router-dom';

import Smurf from './Smurf';

class Smurfs extends Component {
  render() {
    return (
      <StyledSmurfs>
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <NavLink to={`/${smurf.id}`}>
                <Route exact path="/" render={pr =>
                  <Smurf
                  name={smurf.name}
                  id={smurf.id}
                  age={smurf.age}
                  height={smurf.height}
                  key={smurf.id}
                  {...pr}
                  />
                } />
              </NavLink>
            );
          })}
        </ul>
      </StyledSmurfs>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

const StyledSmurfs = styled.div`
  width: 80%;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a {
      text-decoration: none;
      color: black;
      width: 40%;
    }
  } 
`;

export default Smurfs;
