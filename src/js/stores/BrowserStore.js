import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _browser = { gifs: [] };

const CHANGE_EVENT = 'change';

function setGifs(payload) {
  var data = { 
    id: payload.gif, 
    video: { name: payload.video, screenshot: payload.screenshot }
  };
  _browser.gifs.unshift(data);
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
      setGifs(payload);
      BrowserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default BrowserStore;