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
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
