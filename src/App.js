import React, { Component } from 'react';
import { Introduction, Tagline, SocialButton } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Introduction />
        <Tagline />
        <div className="container social-buttons">
          <SocialButton name="github" icon="fa-github" link="https://github.com/chody-h" />
        </div>
      </div>
    );
  }
}

export default App;
