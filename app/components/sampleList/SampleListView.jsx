import React from '../../utils/safeReact';
import Helmet from 'react-helmet';
import {connectToStores} from 'react-fluxible-utils';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import SampleList from './SampleList.jsx';
import {I18n, Translate} from 'react-fluxible-i18n';

let SampleListView = React.createClass({
  propTypes: {
    samples: React.PropTypes.array,
    isLoading: React.PropTypes.bool.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={'ah'/* I18n.t('samples.list') */}/>
        <Title><Translate value="samples.list"/></Title>
        <Loader isLoading={this.props.isLoading}>
          <SampleList samples={this.props.samples}/>
        </Loader>
      </div>
    );
  }
});

SampleListView = connectToStores(SampleListView, ['SampleStore'], (context) => ({
  samples: context.getStore('SampleStore').getAll()
}));

export default SampleListView;
