import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _upload = { 
  percent: null
};

const CHANGE_EVENT = 'change';

function setUploadProgress(percent) {
  _upload.percent = percent;
}

const UploadStore = assign({}, EventEmitter.prototype, {
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
  getUploadStatus() {
    return _upload.percent;
  }
})

UploadStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.UPLOADING_TO_S3:
      setUploadProgress(payload.percent);
      UploadStore.emitChange();
      break;

    case ActionType.S3_UPLOAD_COMPLETE:
      setUploadProgress(100);
      UploadStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default UploadStore;