import React from 'react';
import Helmet from 'react-helmet';
import { expect } from 'chai';
import sinon from 'sinon';
import {ShallowComponent} from '../../../../utils/storeMocks';

import SampleListView from '../../../../../app/components/sampleList/SampleListView.jsx';
import Loader from '../../../../../app/components/_common/Loader.jsx';
import SampleStore from '../../../../../app/stores/sampleStore';
import SampleList from '../../../../../app/components/sampleList/SampleList.jsx';

describe('SampleListView Component', function() {
  const sampleData = [
    {'id': 1, 'name': 'firstItem'},
    {'id': 2, 'name': 'secondItem'}
  ];

  describe('connected component to stores', function() {
    beforeEach(function() {
      sinon.stub(SampleStore.prototype, 'getAll').returns(sampleData);
    });

    afterEach(function() {
      SampleStore.prototype.getAll.restore();
    });

    it('should map the store results to the correct props', function() {
      const sut = new ShallowComponent(SampleListView)
        .withProps({loading: false})
        .withStore(SampleStore)
        .get(SampleListView.originalComponent);

      expect(sut).to.have.deep.property('props.samples').that.deep.equals(sampleData);
    });
  });

  describe('composition', function() {
    it('should have Loader component', function() {
      const loader = new ShallowComponent(SampleListView.originalComponent)
        .withProps({samples: []})
        .get(Loader);

      expect(loader).to.be.ok;
    });

    it('should pass loading property to Loader module (true)', function() {
      const loader = new ShallowComponent(SampleListView.originalComponent)
        .withProps({samples: [], loading: true})
        .get(Loader);

      expect(loader).to.have.deep.property('props.isLoading', true);
    });

    it('should pass loading property to Loader module  (false)', function() {
      const loader = new ShallowComponent(SampleListView.originalComponent)
        .withProps({samples: [], loading: false})
        .get(Loader);
      expect(loader).to.have.deep.property('props.isLoading', false);
    });

    it('should pass samples to List items props', function() {
      const sampleList = new ShallowComponent(SampleListView.originalComponent)
        .withProps({samples: sampleData})
        .get(SampleList);

      expect(sampleList).to.be.ok;
      expect(sampleList).to.have.deep.property('props.items').equals(sampleData);
    });
  });
});