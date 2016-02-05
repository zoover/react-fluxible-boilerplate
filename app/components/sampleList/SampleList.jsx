import React from 'react';
import ListItem from '../_common/ListItem.jsx';

class SampleList extends React.Component {
  static propTypes = {
    samples: React.PropTypes.array,
  };

  render() {
    const sampleRender = sample => (
      <ListItem key={sample.id} route="sampleItem" id={sample.id} name={sample.name}/>
    );
    return (
      <ul>{this.props.samples.map(sampleRender)}</ul>
    );
  }
}

export default SampleList;
