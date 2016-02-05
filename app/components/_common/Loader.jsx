import React from 'react';
import { Translate } from 'react-fluxible-i18n';

class Loader extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    isLoading: false,
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <p><Translate value="general.loading"/></p>
        </div>
      );
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Loader;
