import React from 'react';
import ListItem from '../_common/ListItem.jsx';

class UserList extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
  };

  render() {
    const userRender = (user) => (
      <ListItem key={user.id} route="userItem" id={user.login} name={user.login}/>
    );
    return (
      <ul>{this.props.users.map(userRender)}</ul>
    );
  }
}

export default UserList;
