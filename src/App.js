import React, { Component } from "react";
import { Introduction, Tagline, SocialButton } from "./components";

const introduction = "Hi, my name is Cody!";
const tags = [
  "Developer",
  "Father",
  "Novice Woodcrafter",
  "Technology Enthusiast"
];
const links = [
  {
    name: "github",
    faIcon: "github",
    url: "https://www.github.com/chody-h"
  },
  {
    name: "linkedin",
    faIcon: "linkedin-square",
    url: "https://www.linkedin.com/in/cody-heffner/"
  },
  {
    name: "resume",
    faIcon: "file-text",
    url: "https://www.visualcv.com/cody-heffner"
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Introduction phrase={introduction} />

        <Tagline attributes={tags} />

        <div className="container social-buttons">
          {links.map(function(object, i) {
            return (
              <SocialButton
                name={object.name}
                icon={object.faIcon}
                link={object.url}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
