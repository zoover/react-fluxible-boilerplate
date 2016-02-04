import { ReactSafeRender as React } from 'react-fluxible-utils';
import ListItem from '../_common/ListItem.jsx';

class UserList extends React.Component {
  render() {
    const userRender = (user) => (
      <ListItem key={user.id} route="userItem" id={user.login} name={user.login}/>
    );
    return (
      <ul>{this.props.users.map(userRender)}</ul>
    );
  }
}

UserList.propTypes = {
  users: React.PropTypes.array,
};

export default UserList;
