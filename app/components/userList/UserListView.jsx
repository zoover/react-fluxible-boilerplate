import React from '../../utils/safeReact';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import UserList from './UserList.jsx';
import {I18n, Translate} from 'react-fluxible-i18n';

let UserListView = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  contextTypes: {
    getStore: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={I18n.t('users.list')}/>
        <Title><Translate value="users.list"/></Title>
        <Loader isLoading={this.props.loading}>
          <UserList users={this.props.users}/>
        </Loader>
      </div>
    );
  }
});

UserListView = connectToStores(UserListView, ['UserStore'], (context, props) => ({
  users: context.getStore('UserStore').getAll(),
  loading: props.isLoading
}));

export default UserListView;