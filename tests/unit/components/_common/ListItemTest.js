import React from 'react';
import { expect } from 'chai';
import {ShallowComponent} from 'react-fluxible-utils';

import ViewToTest from '../../../../app/components/_common/ListItem.jsx';

import {NavLink} from 'fluxible-router';

describe('SampleList Component', function() {
  const defaultProps = {route: 'x', id: 1, name: 'y'};

  let component = null;

  beforeEach(function() {
    component = new ShallowComponent(ViewToTest).withProps(defaultProps);
  });
  
  describe('composition', function() {
    it('should have li component', function() {
      expect(component.get('li')).to.be.ok;
    });

    it('should have NavLink component', function() {
      expect(component.get(NavLink)).to.be.ok;
    });
  });
  
  describe('props passing', function() {
    it('should pass route property to NavLink component', function() {
      const navLink = component.get(NavLink);
      expect(navLink).to.have.deep.property('props.routeName', defaultProps.route);
    });

    it('should pass id property to NavLink component', function() {
      const navLink = component.get(NavLink);
      expect(navLink).to.have.deep.property('props.navParams.id', defaultProps.id);
    });
    
    it('should pass name property to NavLink component', function() {
      const navLink = component.get(NavLink);
      expect(navLink).to.have.deep.property('props.children', defaultProps.name);
    });
  });
});