import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: null,
      loading: false,
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
    const id = this.state.smurfs.length ;

    this.resetError();
    this.startSpinner();
    axios.post('http://localhost:3333/smurfs', { id, name, age, height})
        .then(res => this.setSmurfs(res.data))
        .catch(this.setError)
        .finally(this.stopSpinner);
}

  setSmurfs = smurfs => this.setState({ smurfs });

  setError = error => this.setState({ error });

  resetError = () => this.setState({ error: null })

  startSpinner = () => this.setState({ loading: true })

  stopSpinner = () => this.setState({ loading: false })

  render() {
    return (
      <div className="App">
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
            />
          } 
        />  
      </div>
    );
  }
}

export default App;
