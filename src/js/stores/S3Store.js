import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _s3 = {};

const CHANGE_EVENT = 'change';

function setUrls(data) {
  _s3.urlData = data;
}

const S3Store = assign({}, EventEmitter.prototype, {
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
  getUrlData() {
    console.log('geturldata func', _s3.urlData)
    return _s3.urlData;
  }
})

S3Store.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.GOT_SIGNED_URL:
      console.log('getting url: ', payload)
      setUrls(payload);
      S3Store.emitChange();
      break;

    default:
      // do nothing
  }

});

export default S3Store;