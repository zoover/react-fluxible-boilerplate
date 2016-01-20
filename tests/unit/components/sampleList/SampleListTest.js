import React from 'react';
import { expect } from 'chai';
import {ShallowComponent} from 'react-fluxible-utils';

import ViewToTest from '../../../../app/components/sampleList/SampleList.jsx';

import ListItem from '../../../../app/components/_common/ListItem.jsx';

describe('SampleList Component', function() {
  const sampleData = [
    {'id': 1, 'name': 'firstItem'},
    {'id': 2, 'name': 'secondItem'}
  ];
  const defaultProps = {samples: []};

  let component = null;

  beforeEach(function() {
    component = new ShallowComponent(ViewToTest).withProps(defaultProps);
  });
  
  describe('composition', function() {
    it('should have ul component', function() {
      expect(component.get('ul')).to.be.ok;
    });
  });
  
  describe('props passing', function() {
    it('should have no ListItem children with no items', function() {
      const renderedItems = component.withProps({samples: []}).getAll(ListItem);
      expect(renderedItems).to.have.length(0);
    });

    it('should have two ListItem children with two samples ', function() {
      const renderedItems = component.withProps({samples: sampleData}).getAll(ListItem);
      expect(renderedItems).to.have.length(sampleData.length);
    });
  });
});