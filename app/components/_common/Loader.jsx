import {ReactSafeRender as React} from 'react-fluxible-utils';
import {Translate} from 'react-i18n-components';

const Loader = React.createClass({

  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  },
  getDefaultProps: function() {
    return {
      isLoading: false
    };
  },
  render: function() {
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
});

export default Loader;
