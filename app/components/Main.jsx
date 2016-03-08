import {ReactSafeRender as React} from 'react-fluxible-utils';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import {handleHistory} from 'fluxible-router';
import provideContext from 'fluxible-addons-react/provideContext';
import Container from './_common/Container.jsx';
import Row from './_common/Row.jsx';
import Col from './_common/Col.jsx';
import Title from './_common/Title.jsx';
import {I18n, Translate} from 'react-i18n-components';

let Main = React.createClass({
  propTypes: {
    currentRoute: React.PropTypes.object,
    context: React.PropTypes.object.isRequired,
    isNavigateComplete: React.PropTypes.bool
  },
  contextTypes: {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  },
  render: function() {
    const Handler = this.props.currentRoute.get('handler');
    const params = this.props.currentRoute.get('params').toJS();
    return (
      <Container>
        <Row>
          <Helmet
            title={I18n.t('general.title')}
            meta={[{name: 'description', content: I18n.t('general.description')}]} />
          <Col sm="6">
            <Title><Translate value="general.title"/></Title>
            <ul>
              <li><NavLink routeName="sampleList"><Translate value="menu.samples"/></NavLink></li>
              <li><NavLink routeName="userList"><Translate value="menu.users"/></NavLink></li>
            </ul>
          </Col>
          <Col sm="6">
            <Handler isLoading={!this.props.isNavigateComplete} {...params}/>
          </Col>
        </Row>
      </Container>
    );
  }
});

Main = handleHistory(Main);
Main = provideContext(Main);

export default Main;
