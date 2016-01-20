import {expect} from 'chai';
import StoreToTest from '../../../app/stores/userStore';
import {MockDispatcher} from 'react-fluxible-utils';
import events from '../../../app/config/events';
import sinon from 'sinon';

describe('userStore', function() {
  let store;
  let dispatcherMock;
  const sampleData = [{id: 1, login: 'test'}];

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(StoreToTest);
    store = dispatcherMock.getStore();
  });

  afterEach(function() {
    store = undefined;
  });

  describe('getAll', function() {
    it('should return empty array after store initialization', function() {
      // act
      const result = store.getAll();

      // assert
      expect(result).to.be.empty;
    });

    it('should return correct user if userId found', function() {
      // arrange
      ;
      const existingId = 'test';
      dispatcherMock.dispatch(events.USER_LIST_LOADED, {users: sampleData});

      // act
      const result = store.getById(existingId);

      expect(result).to.eql(sampleData[0]);
    });
  });

  describe('handle USER_LIST_LOADED', function() {
    it('should return combined arrays on successive dispatch', function() {
      // arrange
      const firstUserArray = [{id: 1, login: 'test'}];
      const secondUserArray = [{id: 2, login: 'the second user'}];

      // act
      dispatcherMock.dispatch(events.USER_LIST_LOADED, {users: firstUserArray});
      dispatcherMock.dispatch(events.USER_LIST_LOADED, {users: secondUserArray});
      const result = store.getAll();

      // assert
      expect(result).to.eql(firstUserArray.concat(secondUserArray));
    });
  });

  describe('derehydrate', function(){
    it('dehydrates and rehydrates properly', function() {
      // arrange
      store.loadUsers({users: sampleData});
      const store2 =  new MockDispatcher(StoreToTest).getStore();

      // act
      store2.rehydrate(store.dehydrate());

      // assert
      const result = store2.getAll();
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(sampleData);
    });
  });
});
