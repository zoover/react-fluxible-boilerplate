import React from '../../utils/safeReact';

const Container = React.createClass({

  propTypes: {
    fluid: React.PropTypes.bool,
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div className={this.props.fluid ? 'container-fluid' : 'container'}>
        {this.props.children}
      </div>
    );
  }
});

export default Container;
