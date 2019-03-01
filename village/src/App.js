import React, { Component } from 'react';
import axios from 'axios';

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
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <SmurfForm
          inputNameRef={this.inputNameRef}
          inputAgeRef={this.inputAgeRef}
          inputHeightRef={this.inputHeightRef}
          postSmurf={this.postSmurf}
        />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
