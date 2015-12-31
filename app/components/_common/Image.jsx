import React from '../../utils/safeReact';
import connectToStores from 'fluxible-addons-react/connectToStores';

let Image = React.createClass({
  propTypes: {
    assetsPath: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <img src={this.props.assetsPath + this.props.src}/>
    );
  }
});

Image = connectToStores(Image, ['ApplicationStore'], (context) => ({
  assetsPath: context.getStore('ApplicationStore').getAssetsPath()
}));

export default Image;
