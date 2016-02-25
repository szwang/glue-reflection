import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _browser = {};

const CHANGE_EVENT = 'change';

function setGifs(data) {
  _browser.gifs = data;
}

const BrowserStore = assign({}, EventEmitter.prototype, {
  // functions for modals
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getGifs() {
    return _browser.gifs;
  }
})

BrowserStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.GOT_GIFS:
      console.log('getting gifs: ', payload)
      setGifs(payload);
      BrowserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default BrowserStore;