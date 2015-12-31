import React from '../../utils/safeReact';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Loader from '../_common/Loader.jsx';
import NotFound from '../_common/NotFound.jsx';
import Title from '../_common/Title.jsx';
import {t} from '../../config/locale';

let SampleItemView = React.createClass({
  propTypes: {
    sample: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    let content;
    if (!this.props.sample) {
      content = <NotFound />;
    } else {
      content = (
        <div>
          <Title>{this.props.sample.name}</Title>
          <p>{t('samples.id')}: {this.props.sample.id}</p>
          <Helmet title={this.props.sample.name}/>
        </div>
      );
    }
    return (
      <div>
        <Loader isLoading={this.props.loading}>
          {content}
        </Loader>
        <NavLink routeName="sampleList">{t('samples.back_to_list')}</NavLink>
      </div>
    );
  }
});

SampleItemView = connectToStores(SampleItemView, ['SampleStore'], (context, props) => ({
  sample: context.getStore('SampleStore').getById(parseInt(props.id, 10)),
  loading: props.isLoading
}));

export default SampleItemView;