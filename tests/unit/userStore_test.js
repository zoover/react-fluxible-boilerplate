//'use strict';
//import {expect} from 'chai';
//import userStore from '../../app/stores/userStore';
//
//describe('userStore', function () {
//    let storeInstance;
//
//    beforeEach(function () {
//        storeInstance = new userStore();
//    });
//
//    afterEach(function () {
//        storeInstance = undefined;
//    });
//
//    it('should contain storename and handlers', function () {
//        expect(userStore).to.be.a('function');
//        expect(userStore.storeName).to.equal('UserStore');
//        expect(userStore.handlers).to.be.an('object');
//        expect(userStore.handlers.USER_LIST_LOADED).to.equal('loadUsers');
//        expect(userStore.handlers.USER_LIST_LOADING).to.equal('startLoading');
//        expect(userStore.handlers.USER_ITEM_LOADING).to.equal('startLoading');
//        expect(userStore.handlers.USER_ITEM_LOADED).to.equal('loadUser');
//
//    });
//
//    it('should contain no data on invalid initialisation', function () {
//      expect(storeInstance.users).to.be.a('map');
//      expect(storeInstance.currentId).to.equal(null);
//      expect(storeInstance.loadCount).to.be.an('number');
//      expect(storeInstance.loadCount).to.equal(0);
//    });
//    it('should contain the correct methods', function () {
//      expect(storeInstance.startLoading).to.be.a('function');
//      expect(storeInstance.loadUser).to.be.a('function');
//      expect(storeInstance.addUpdateUser).to.be.a('function');
//      expect(storeInstance.getAll).to.be.a('function');
//      expect(storeInstance.getById).to.be.a('function');
//      expect(storeInstance.getCurrent).to.be.a('function');
//      expect(storeInstance.isLoading).to.be.a('function');
//      expect(storeInstance.rehydrate).to.be.a('function');
//      expect(storeInstance.dehydrate).to.be.a('function');
//    });
//    it('startLoading should increase loadCount', function () {
//
//    })
//});
