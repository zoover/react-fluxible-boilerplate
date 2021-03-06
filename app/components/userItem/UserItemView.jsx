import {ReactSafeRender as React} from 'react-fluxible-utils';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import {connectToStores} from 'react-fluxible-utils';
import Loader from '../_common/Loader.jsx';
import NotFound from '../_common/NotFound.jsx';
import Title from '../_common/Title.jsx';
import {Translate} from 'react-fluxible-i18n';

let UserItemView = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    isLoading: React.PropTypes.bool.isRequired
  },
  render: function() {
    let content;
    if (!this.props.user) {
      content = <NotFound />;
    } else {
      content = (
        <div>
          <Title>{this.props.user.login}</Title>
          <p><Translate value="users.id"/>: {this.props.user.id}</p>
          <Helmet title={this.props.user.login}/>
        </div>
      );
    }
    return (
      <div>
        <Loader isLoading={this.props.isLoading}>
          {content}
        </Loader>
        <NavLink routeName="userList"><Translate value="users.back_to_list"/></NavLink>
      </div>
    );
  }
});

UserItemView = connectToStores(UserItemView, ['UserStore'], (context, props) => ({
  user: context.getStore('UserStore').getById(props.id)
}));

export default UserItemView;