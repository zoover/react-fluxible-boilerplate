import React from 'react';

class Row extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}

export default Row;
