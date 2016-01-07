import {ReactSafeRender as React} from 'react-fluxible-utils';
import ListItem from '../_common/ListItem.jsx';

const UserList = React.createClass({
  propTypes: {
    users: React.PropTypes.array
  },
  render: function() {
    const userRender = (user) => {
      return (
        <ListItem key={user.id} route="userItem" id={user.login} name={user.login}/>
      );
    };
    return (
      <ul>{this.props.users.map(userRender)}</ul>
    );
  }
});

export default UserList;