import { ReactSafeRender as React } from 'react-fluxible-utils';
import Helmet from 'react-helmet';
import { NavLink } from 'fluxible-router';
import { connectToStores } from 'react-fluxible-utils';
import Loader from '../_common/Loader.jsx';
import NotFound from '../_common/NotFound.jsx';
import Title from '../_common/Title.jsx';
import { Translate } from 'react-fluxible-i18n';

let SampleItemView = React.createClass({
  propTypes: {
    sample: React.PropTypes.object,
    isLoading: React.PropTypes.bool.isRequired
  },
  render: function () {
    let content;
    if (!this.props.sample) {
      content = <NotFound />;
    } else {
      content = (
        <div>
          <Title>{this.props.sample.name}</Title>
          <p><Translate value="samples.id"/>: {this.props.sample.id}</p>
          <Helmet title={this.props.sample.name}/>
        </div>
      );
    }
    return (
      <div>
        <Loader isLoading={this.props.isLoading}>
          {content}
        </Loader>
        <NavLink routeName="sampleList"><Translate value="samples.back_to_list"/></NavLink>
      </div>
    );
  }
});

SampleItemView = connectToStores(SampleItemView, ['SampleStore'], (context, props) => ({
  sample: context.getStore('SampleStore').getById(parseInt(props.id, 10))
}));

export default SampleItemView;
