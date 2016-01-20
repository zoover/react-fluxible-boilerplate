import {expect} from 'chai';
import StoreToTest from '../../../app/stores/userStore';
import {MockDispatcher} from 'react-fluxible-utils';
import sinon from 'sinon';

describe('userStore', function() {
  let store;
  let dispatcherMock;
  const sampleData = [
    {id: 1, login: 'test'},
    {id: 2, login: 'the second user'}
  ];

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(StoreToTest);
    store = dispatcherMock.getStore();
  });

  afterEach(function() {
    store = undefined;
  });

  describe('getAll', function() {
    it('should return empty array after store initialization', function() {
      expect(store.getAll()).to.be.empty;
    });
    
    it('should return all users after user items loaded', function() {
      dispatcherMock.dispatch('USER_ITEM_LOADED', {user: sampleData[0]});
      dispatcherMock.dispatch('USER_ITEM_LOADED', {user: sampleData[1]});
      expect(store.getAll()).to.deep.equal(sampleData);
    });    

    it('should return all users after user lists loaded', function() {
      dispatcherMock.dispatch('USER_LIST_LOADED', {users: [sampleData[0]]});
      dispatcherMock.dispatch('USER_LIST_LOADED', {users: [sampleData[1]]});
      expect(store.getAll()).to.deep.equal(sampleData);
    });
  });

  describe('getById', function() {
     it('should return undefined if user not found', function() {
      expect(store.getById('test')).to.be.undefined;
    });
    
    it('should return correct user if userId found', function() {
      dispatcherMock.dispatch('USER_LIST_LOADED', {users: sampleData});
      expect(store.getById('test')).to.eql(sampleData[0]);
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
