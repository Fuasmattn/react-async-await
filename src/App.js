import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      loading: false,
      fun: ``
    }
  }

  getAsync = () => {
    return `asyncawait = async () => {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const result = await response.json();
  
      this.setState(prevState => ({...prevState, result, loading: false}));
    };`
  }

  getPromise = () => {
      return `promise = () => 
       fetch('https://api.chucknorris.io/jokes/random').then(
        repsonse => {
          repsonse.json().then(result => this.setState(prevState => ({...prevState, result, loading: false})))
        },
        e => {
          console.log(e)
        }
      );
    `
  }

  asyncawait = async () => {
    this.setState(prevState => ({...prevState, loading: true, result: {value: '-'}, fun: this.getAsync()}));

    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const result = await response.json();

    this.setState(prevState => ({...prevState, result, loading: false}));
  };

  promise = () => {
    this.setState(prevState => ({...prevState, loading: true, result: {value: '-'}, fun: this.getPromise()}));

    return fetch('https://api.chucknorris.io/jokes/random').then(
      repsonse => {
        repsonse.json().then(result => this.setState(prevState => ({...prevState, result, loading: false})))
      },
      e => {
        console.log(e)
      }
    );
  }

  render() {
    const { fun } = this.state;
    return (
      <div className="App">
     
     <header>
     {this.state.loading && <div className="App-header">
     </div>}
     </header>
        <span className="App-intro">
          <h2>Did you know?</h2>
        </span>
        <p className="App-intro">
          {this.state.result.value}
        </p>
        <div><button onClick={this.asyncawait}>What? AsyncAwait</button></div>
        <div><button onClick={this.promise}>What? Promise</button></div>

        <div className="code-container">
          <div className="code">
          {this.state.result.value && 
            <pre>
            <code>{fun}</code>
          </pre>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
