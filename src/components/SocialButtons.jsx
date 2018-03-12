import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

export class SocialButtons extends Component {
  render() {
    console.log(this.props.delay);
    return (
      <div
        className="container SocialButtons"
        style={{ animationDelay: this.props.delay + "s" }}
      >
        {this.props.links.map(function(object, i) {
          return (
            <SocialButton
              key={i}
              name={object.name}
              icon={object.faIcon}
              link={object.url}
            />
          );
        })}
      </div>
    );
  }
}

const style = {
  display: "inline-block",
  margin: "0em 0.5em"
};

class SocialButton extends Component {
  render() {
    return (
      <div className={"SocialButton " + this.props.name} style={style}>
        <a href={this.props.link} target="_blank">
          <FontAwesome
            name={this.props.icon}
            className={this.props.name}
            size="3x"
          />
        </a>
      </div>
    );
  }
}
