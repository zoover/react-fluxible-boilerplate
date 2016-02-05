import React from 'react';
import { Translate } from 'react-fluxible-i18n';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <p><Translate value="general.not_found"/></p>
      </div>
    );
  }
}

export default NotFound;
