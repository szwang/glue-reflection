import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _recorder = { play: false, uploading: false };

const CHANGE_EVENT = 'change';

function play() {
  _recorder.play = true;
}

function setUploadStatus(bool) {
  _recorder.uploading = bool;
}

const RecorderStore = assign({}, EventEmitter.prototype, {
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
  getPlayStatus() { //returns bool
    return _recorder.play;
  },
  getUploadStatus() {
    return _recorder.uploading;
  }
})

RecorderStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.BEGIN_RECORD:
      play();
      RecorderStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default RecorderStore;