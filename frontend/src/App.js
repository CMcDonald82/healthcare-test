import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import { BrowserRouter, Route } from 'react-router-dom';
import { Button } from 'react-md';
import Step1Container from './containers/Step1Container';
import './App.css';


WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome To The Diagnosis App</h1>
        </header>

        <BrowserRouter>
          <div>
            <Route exact path="/" component={Step1Container} />
            
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
