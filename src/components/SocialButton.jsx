import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

const style = {
  display: "inline-block",
  margin: "0em 0.5em"
};

export class SocialButton extends Component {
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
