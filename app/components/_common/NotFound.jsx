import React from '../../utils/safeReact';
import {Translate} from 'react-fluxible-i18n';

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
