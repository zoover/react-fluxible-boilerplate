import React from 'react';
import { NavLink } from 'fluxible-router';

class ListItem extends React.Component {
  static propTypes = {
    route: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: React.PropTypes.string,
  };

  render() {
    return (
      <li>
        <NavLink routeName={this.props.route} navParams={{ id: this.props.id }}>
          {this.props.name}
        </NavLink>
      </li>
    );
  }
}

export default ListItem;
