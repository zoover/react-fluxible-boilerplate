import React from '../../utils/safeReact';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import SampleList from './SampleList.jsx';
import {I18n, Translate} from 'react-fluxible-i18n';

let SampleListView = React.createClass({
  propTypes: {
    samples: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  contextTypes: {
    getStore: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={I18n.t('samples.list')}/>
        <Title><Translate value="samples.list"/></Title>
        <Loader isLoading={this.props.loading}>
          <SampleList samples={this.props.samples}/>
        </Loader>
      </div>
    );
  }
});

SampleListView = connectToStores(SampleListView, ['SampleStore'], (context, props) => ({
  samples: context.getStore('SampleStore').getAll(),
  loading: props.isLoading
}));

export default SampleListView;