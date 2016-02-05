import React from 'react';

class Title extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <h1>{this.props.children}</h1>
    );
  }
}

export default Title;
