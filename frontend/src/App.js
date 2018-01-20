import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import { BrowserRouter, Route } from 'react-router-dom';
import { Button } from 'react-md';
import Step1Container from './containers/Step1Container';
import Step2Container from './containers/Step2Container';
import Step3Container from './containers/Step3Container';
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
          <Button flat primary href={'/'}>Reset</Button>
        </header>

        <BrowserRouter>
          <div>
            <Route exact path="/" component={Step1Container} />
            <Route exact path="/symptoms/:id" component={Step2Container} />
            <Route path="/symptoms/:id/full-list" component={Step3Container} />
            
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
