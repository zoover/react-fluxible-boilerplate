import { ReactSafeRender as React } from 'react-fluxible-utils';
import { Translate } from 'react-fluxible-i18n';

const NotFound = React.createClass({
  render: function () {
    return (
      <div>
        <p><Translate value="general.not_found"/></p>
      </div>
    );
  }
});

export default NotFound;
