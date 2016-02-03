import {ReactSafeRender as React} from 'react-fluxible-utils';
import Helmet from 'react-helmet';
import {connectToStores} from 'react-fluxible-utils';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import UserList from './UserList.jsx';
import {I18n, Translate} from 'react-fluxible-i18n';

let UserListView = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    isLoading: React.PropTypes.bool.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={I18n.t('users.list', {count: this.props.users.length})}/>
        <Title><Translate value="users.list" count={this.props.users.length}/></Title>
        <Loader isLoading={this.props.isLoading}>
          <UserList users={this.props.users}/>
        </Loader>
      </div>
    );
  }
});

UserListView = connectToStores(UserListView, ['UserStore'], (context) => ({
  users: context.getStore('UserStore').getAll()
}));

export default UserListView;