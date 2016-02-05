import React from 'react';

class Container extends React.Component {
  static propTypes = {
    fluid: React.PropTypes.bool,
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div className={this.props.fluid ? 'container-fluid' : 'container'}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
