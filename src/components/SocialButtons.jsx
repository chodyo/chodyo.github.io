import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

export class SocialButtons extends Component {
  render() {
    return (
      <div
        className="container SocialButtons"
        style={{ animationDelay: this.props.delay + "s" }}
      >
        {this.props.links.map(function (object, i) {
          return (
            <SocialButton
              key={i}
              name={object.name}
              icon={object.faIcon}
              color={object.iconActiveColor}
              link={object.url}
              display={object.display}
            />
          );
        })}
      </div>
    );
  }
}

const style = {
  margin: "0em 0.5em",
};

class SocialButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  setButtonHovered = (isHovered) => {
    this.setState({ isHovered: isHovered });
  };

  render() {
    return (
      <div
        className={"SocialButton " + this.props.name}
        style={{ ...style, ...{ display: this.props.display } }}
        onMouseEnter={() => this.setButtonHovered(true)}
        onMouseLeave={() => this.setButtonHovered(false)}
      >
        <a href={this.props.link} target="_blank">
          <FontAwesome
            name={this.props.icon}
            className={this.props.name}
            size="3x"
            style={{
              color: this.state.isHovered ? this.props.color : "",
            }}
          />
        </a>
      </div>
    );
  }
}
