import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _video = { 
  play: false
};

const CHANGE_EVENT = 'change';

const VideoStore = assign({}, EventEmitter.prototype, {
  // functions for modals
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

VideoStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.BEGIN_RECORD:
      record();
      VideoStore.emitChange();
      break;

    case ActionType.BEGIN_UPLOAD:
      setUploadStatus(payload.uploading);
      VideoStore.emitUpload();
      break;

    case ActionType.UPLOAD_STATUS:
      setUploadStatus(payload.uploading);
      setUploadResult(payload.success);
      setTaskID(payload.id);
      VideoStore.emitUpload();

    default:
      // do nothing
  }

});

export default VideoStore;