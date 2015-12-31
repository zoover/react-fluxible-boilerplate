import React from '../../utils/safeReact';

const Row = React.createClass({

  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
});

export default Row;
