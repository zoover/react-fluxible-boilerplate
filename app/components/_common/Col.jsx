import React from '../../utils/safeReact';

const Col = React.createClass({

  propTypes: {
    xs: React.PropTypes.string.isRequired,
    sm: React.PropTypes.string,
    md: React.PropTypes.string,
    lg: React.PropTypes.string,
    children: React.PropTypes.node
  },
  getDefaultProps: function() {
    return {
      xs: '12'
    };
  },
  getClassName: function() {
    return 'col-xs-' + this.props.xs +
      (this.props.sm ? ' col-sm-' + this.props.sm : '') +
      (this.props.md ? ' col-md-' + this.props.md : '') +
      (this.props.lg ? ' col-lg-' + this.props.lg : '');
  },
  render: function() {
    return (
      <div className={this.getClassName()}>
        {this.props.children}
      </div>
    );
  }
});

export default Col;
