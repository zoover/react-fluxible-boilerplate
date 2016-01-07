import {ReactSafeRender as React} from 'react-fluxible-utils';

const Title = React.createClass({

  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <h1>{this.props.children}</h1>
    );
  }
});

export default Title;
