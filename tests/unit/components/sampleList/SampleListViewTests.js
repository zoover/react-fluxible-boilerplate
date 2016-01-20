import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import {ShallowComponent} from 'react-fluxible-utils';

import ViewToTest from '../../../../app/components/sampleList/SampleListView.jsx';
import Store from '../../../../app/stores/sampleStore';

import Loader from '../../../../app/components/_common/Loader.jsx';
import Title from '../../../../app/components/_common/Title.jsx';
import SampleList from '../../../../app/components/sampleList/SampleList.jsx';

describe('SampleListView Component', function() {
  const sampleData = [
    {'id': 1, 'name': 'firstItem'},
    {'id': 2, 'name': 'secondItem'}
  ];
  const defaultProps = {isLoading: false};
  
  let component = null;

  beforeEach(function() {
    component = new ShallowComponent(ViewToTest).withProps(defaultProps);
  });

  describe('connection to store', function() {
    it('should map the store results to the correct props', function() {
      sinon.stub(Store.prototype, 'getAll').returns(sampleData);
      const sut = component.withStore(Store).getSelf();
      expect(sut).to.have.deep.property('props.samples').that.deep.equals(sampleData);
      Store.prototype.getAll.restore();
    });
  });

  describe('composition', function() {
    it('should have Title component', function() {
      expect(component.get(Title)).to.be.ok;
    });

    it('should have Loader component', function() {
      expect(component.get(Loader)).to.be.ok;
    });

    it('should have SampleList component', function() {
      expect(component.get(SampleList)).to.be.ok;
    });
  });
  
  describe('prop passing', function() {
    it('should pass loading property to Loader component', function() {
      const loader = component.withProps({isLoading: true}).get(Loader);
      expect(loader).to.have.deep.property('props.isLoading', true);

      const loader2 = component.withProps({isLoading: false}).get(Loader);
      expect(loader2).to.have.deep.property('props.isLoading', false);
    });

    it('should pass samples to SampleList component', function() {
      const sampleList = component.withProps({isLoading: false, samples: sampleData}).get(SampleList);
      expect(sampleList).to.have.deep.property('props.samples').that.deep.equals(sampleData);
    });
  });
});