import BaseStore from 'fluxible/addons/BaseStore';

export default class UserStore extends BaseStore {
  static storeName = 'UserStore';
  static handlers = {
    ['USER_LIST_LOADED']: 'loadUsers',
    ['USER_ITEM_LOADED']: 'loadUser',
  };

  constructor(dispatcher) {
    super(dispatcher);
    this._setUsers([]);
  }

  loadUsers(payload) {
    this._addUsers(payload.users);
    this.emitChange();
  }

  loadUser(payload) {
    this._addUsers([payload.user]);
    this.emitChange();
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getById(id) {
    return this.users.get(id);
  }

  dehydrate() {
    return {
      users: this.getAll(),
    };
  }

  rehydrate(state) {
    this._setUsers(state.users);
  }

  _setUsers(usersArray) {
    this.users = new Map();
    this._addUsers(usersArray);
  }

  _addUsers(usersArray) {
    usersArray.map((user) => {
      this.users.set(user.login, user);
    });
  }
}
