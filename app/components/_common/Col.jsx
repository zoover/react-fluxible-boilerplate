import React from 'react';

class Col extends React.Component {
  static propTypes = {
    xs: React.PropTypes.string.isRequired,
    sm: React.PropTypes.string,
    md: React.PropTypes.string,
    lg: React.PropTypes.string,
    xl: React.PropTypes.string,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    xs: '12',
  };

  getClassName() {
    let className = `col-xs-${this.props.xs}`;
    if (this.props.sm) className += ` col-sm-${this.props.sm}`;
    if (this.props.md) className += ` col-md-${this.props.md}`;
    if (this.props.lg) className += ` col-lg-${this.props.lg}`;
    if (this.props.xl) className += ` col-xl-${this.props.xl}`;
    return className;
  }

  render() {
    return (
      <div className={this.getClassName()}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;
