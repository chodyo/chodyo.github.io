import React, { Component } from "react";

const taglineStyles = {
  fontSize: "1.25em",
  fontWeight: "300",
  marginBottom: "1em"
};

export class Tagline extends Component {
  render() {
    return (
      <h2 className="Tagline" style={taglineStyles}>
        {this.props.attributes.map((attr, i) => {
          const delay = (
            this.props.delay +
            i * this.props.delayInterval
          ).toString();
          return <Tag key={i} delay={delay} text={attr} />;
        })}
      </h2>
    );
  }
}

const tagStyles = {
  margin: "0em 0.5em"
};

class Tag extends Component {
  render() {
    var myStyles = Object.assign({}, tagStyles, {
      animationDelay: this.props.delay + "s"
    });
    return (
      <span className="Tag" style={myStyles}>
        {this.props.text}
      </span>
    );
  }
}
