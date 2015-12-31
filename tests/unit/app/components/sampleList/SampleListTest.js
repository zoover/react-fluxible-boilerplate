import React from 'react';
import { expect } from 'chai';
import {ShallowComponent} from '../../../../utils/storeMocks';

import SampleList from '../../../../../app/components/sampleList/SampleList.jsx';
import ListItem from '../../../../../app/components/_common/ListItem.jsx';

let component = null;

describe('SampleList Component', function() {
  
  beforeEach(function() {
    component = new ShallowComponent(SampleList);
  });
  
  it('should have no ListItem children with no items', function() {
    const renderedItems = component.withProps({samples: []}).getAll(ListItem);
    expect(renderedItems).to.have.length(0);
  });

  it('should have two ListItem children with two samples ', function() {
    const samples = [
      {'id': 1, 'name': 'firstItem'},
      {'id': 2, 'name': 'secondItem'}
    ];

    const renderedItems = component.withProps({samples: samples}).getAll(ListItem);
    expect(renderedItems).to.have.length(2);
  });

});