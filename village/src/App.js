import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: null,
      loading: false,
      selected: "",
    };
  }

  inputNameRef = React.createRef();
  inputAgeRef = React.createRef();
  inputHeightRef = React.createRef();

  componentDidMount() {
    this.fetchSmurfs('http://localhost:3333/smurfs');
  }

  fetchSmurfs = url => {
    this.resetError();
    this.startSpinner();
    axios.get(url)
        .then(res => this.setSmurfs(res.data))
        .catch(this.setError)
        .finally(this.stopSpinner);
  }

  postSmurf = () => {
    const name= this.inputNameRef.current.value;
    const age= this.inputAgeRef.current.value;
    const height = this.inputHeightRef.current.value;
    const id = this.state.smurfs.length;

    this.resetError();
    this.startSpinner();
    axios.post('http://localhost:3333/smurfs', { id, name, age, height})
        .then(res => this.setSmurfs(res.data))
        .catch(this.setError)
        .finally(this.stopSpinner);
  }

  deleteSmurf = id => {
    this.resetError();
    this.startSpinner();
    axios.delete(`http://localhost:3333/smurfs/${id}`)
        .then(res => this.setSmurfs(res.data))
        .catch(this.setError)
        .finally(this.stopSpinner);
  }

  updateSmurf = id => {
    const name= this.inputNameRef.current.value;
    const age= this.inputAgeRef.current.value;
    const height = this.inputHeightRef.current.value;

    this.resetError();
    this.startSpinner();
    axios.put(`http://localhost:3333/smurfs/${id}`, { name, age, height})
        .then(res => this.setSmurfs(res.data))
        .catch(this.setError)
        .finally(this.stopSpinner);
  }

  setSmurfs = smurfs => this.setState({ smurfs });

  setError = error => this.setState({ error });

  resetError = () => this.setState({ error: null })

  startSpinner = () => this.setState({ loading: true })

  stopSpinner = () => this.setState({ loading: false })

  updateSelected = selected => this.setState({ selected })

  render() {
    return (
      <StyledApp>
        <StyledNav>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/smurf-form">Form</NavLink>
        </StyledNav>
        <Route 
          exact path="/" 
          render={pr => <Smurfs {...pr} smurfs={this.state.smurfs}/>} 
        />
        <Route 
          path="/smurf-form" 
          render={
            pr =>         
              <SmurfForm
              {...pr}
              inputNameRef={this.inputNameRef}
              inputAgeRef={this.inputAgeRef}
              inputHeightRef={this.inputHeightRef}
              postSmurf={this.postSmurf}
              deleteSmurf={this.deleteSmurf}
              updateSmurf={this.updateSmurf}
              selected={this.state.selected}
              updateSelected={this.updateSelected}
              smurfs={this.state.smurfs}
          />
          } 
        />
        {
          this.state.smurfs.map(smurf =>
            <Route path={`/${smurf.id}`} render={pr =>
              <Smurf
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
                {...pr}
              />
            } 
          />
          )
        }
          
      </StyledApp>
    );
  }
}

const StyledApp = styled.div`
  text-align: center;
`;

const StyledNav = styled.nav`
      display:flex;
      justify-content: space-evenly;
      padding: 30px 0;
      font-size: 1.6rem;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: gray;
        }
      }
      .active {
          text-decoration: underline;
        }
`;

export default App;
