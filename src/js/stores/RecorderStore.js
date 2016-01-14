import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _recorder = { play: false, uploading: false };

const CHANGE_EVENT = 'change';
const UPLOAD_EVENT = 'upload';

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
  
  emitUpload() {
    this.emit(UPLOAD_EVENT);
  },
  addUploadListener(callback) {
    this.on(UPLOAD_EVENT, callback);
  },
  removeUploadListener(callback) {
    this.removeListener(UPLOAD_EVENT, callback);
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

    case ActionType.BEGIN_UPLOAD:
      setUploadStatus(payload.uploadStatus);
      RecorderStore.emitUpload();
      break;

    default:
      // do nothing
  }

});

export default RecorderStore;