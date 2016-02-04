import { ReactSafeRender as React } from 'react-fluxible-utils';
import { connectToStores } from 'react-fluxible-utils';

let Image = React.createClass({
  propTypes: {
    assetsPath: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <img src={this.props.assetsPath + this.props.src}/>
    );
  }
});

Image = connectToStores(Image, ['ApplicationStore'], (context) => ({
  assetsPath: context.getStore('ApplicationStore').getAssetsPath()
}));

export default Image;
