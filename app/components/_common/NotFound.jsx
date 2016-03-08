import {ReactSafeRender as React} from 'react-fluxible-utils';
import {Translate} from 'react-i18n-components';

const NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <p><Translate value="general.not_found"/></p>
      </div>
    );
  }
});

export default NotFound;
