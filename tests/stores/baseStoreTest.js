// 'use strict';
// import {expect} from 'chai';
// import storeToUse from '../../app/stores/storeToUse';
//
// describe('storeToUse', function () {
//     let storeInstance;
//
//     beforeEach(function () {
//         storeInstance = new storeToUse();
//     });
//
//     afterEach(function () {
//         storeInstance = undefined;
//     });
//
//     it('should contain storename and handlers', function () {
//         expect(storeToUse).to.be.a('function');
//         expect(storeToUse.storeName).to.equal('storeToUse');
//         expect(storeToUse.handlers).to.be.an('object');
//         expect(storeToUse.handlers.USER_LIST_LOAD).to.equal('handleUserListLoad');
//         expect(storeToUse.handlers.USER_LIST_LOADING).to.equal('handleUserListLoading');
//         //any other static properties not declared in constructor have to be added below
//     });
//
//     it('should contain correct methods', function () {
//       expect(storeInstance.dehydrate).to.be.a('function');
//       expect(storeInstance.rehydrate).to.be.a('function');
//       expect(storeInstance.constructor).to.be.a('function');
//       //add methods to test here
//     });
//
//     it('rehydrate should set all needed state variables in store', function() {
//       expect(storeInstance.dehydrate()).to.be.an('object');
//       storeInstance.rehydrate(state);
//       let store.state = storeInstance.getUsers();
//       expect(state.length).to.equal(length);
//       //add all other state variables that are set in the store
//       //need to be added below
//     });
// });
