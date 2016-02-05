import React from 'react';
import { connectToStores } from 'react-fluxible-utils';

class Image extends React.Component {
  static propTypes = {
    assetsPath: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <img src={this.props.assetsPath + this.props.src}/>
    );
  }
}

Image = connectToStores(Image, ['ApplicationStore'], (context) => ({
  assetsPath: context.getStore('ApplicationStore').getAssetsPath(),
}));

export default Image;
