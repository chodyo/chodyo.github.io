import React, { Component } from "react";

const styles = {
  fontSize: "3.2em",
  fontWeight: "800",
  marginBottom: "1em"
};

export class Introduction extends Component {
  render() {
    return (
      <h1 className="Introduction" style={styles}>
        {this.props.phrase}
      </h1>
    );
  }
}
