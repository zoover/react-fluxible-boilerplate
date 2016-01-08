import {expect} from 'chai';
import UserStore from '../../../../app/stores/userStore';
import {MockDispatcher} from 'react-fluxible-utils';
import events from '../../../../app/config/events';
import sinon from 'sinon';

describe('userStore', function() {
  let sut;  // sut = SystemUnderTest
  let dispatcherMock;

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(UserStore);
    sut = dispatcherMock.getStore();
  });

  afterEach(function() {
    sut = undefined;
  });

  describe('getAll', function() {
    it('should return empty array after store initialization', function() {
      // act
      const result = sut.getAll();

      // assert
      expect(result).to.be.empty;
    });

    it('should return correct user if userId found', function() {
      // arrange
      const testUserArray = [{id: 1, login: 'test'}];
      const existingId = 'test';
      dispatcherMock.dispatch(events.USER_LIST_LOADED, {users: testUserArray});

      // act
      const result = sut.getById(existingId);

      expect(result).to.eql(testUserArray[0]);
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
      const result = sut.getAll();

      // assert
      expect(result).to.eql(firstUserArray.concat(secondUserArray));
    });
  });

  describe('dehydrate', function() {
    it('should return serialized state of user store', function() {
      const userArray = [{id: 1, login: 'test'}];

      sut.getAll = sinon.stub().returns(userArray);

      expect(sut.dehydrate()).to.eql({
        users: userArray
      });
    });
  });

  describe('rehydrate', function() {
    it('should set the current state from the serialized state', function() {
      const state = {
        users: [{id: 2, login: 'test'}]
      };

      sut.rehydrate(state);

      expect(sut.dehydrate()).to.eql(state);
    });
  });
});
