import React, { Component } from "react";

const styles = {
  fontSize: "1.25em",
  fontWeight: "300",
  marginBottom: "0.5em"
};

export class Tagline extends Component {
  render() {
    return (
      <h2 className="Tagline" style={styles}>
        {this.props.attributes.join(" | ")}
      </h2>
    );
  }
}
