import React, { Component } from "react";

const styles = {
  fontSize: "3.2em",
  fontWeight: "800",
  marginBottom: "1em"
};

export class Introduction extends Component {
  render() {
    const myStyles = Object.assign({}, styles, {
      animationDelay: this.props.delay + "s"
    });
    return (
      <h1 className="Introduction" style={myStyles}>
        {this.props.phrase}
      </h1>
    );
  }
}
