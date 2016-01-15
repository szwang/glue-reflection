import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _recorder = { 
  record: false, 
  uploading: false, 
  uploadSuccess: false,
  taskID: null 
};

const CHANGE_EVENT = 'change';
const UPLOAD_EVENT = 'upload';

function record() {
  _recorder.record = true;
}

function setUploadStatus(bool) {
  _recorder.uploading = bool;
}

function setUploadResult(bool) {
  _recorder.uploadSuccess = bool;
}

function setTaskID(id) {
  _recorder.taskID = id;
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
  getRecordStatus() { //returns bool
    return _recorder.record;
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
    return {
      uploading: _recorder.uploading,
      uploadSuccess: _recorder.uploadSuccess,
      taskID: _recorder.taskID
    }
  },
  getTaskID() {
    return _recorder.taskID;
  }
})

RecorderStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.BEGIN_RECORD:
      record();
      RecorderStore.emitChange();
      break;

    case ActionType.BEGIN_UPLOAD:
      setUploadStatus(payload.uploading);
      RecorderStore.emitUpload();
      break;

    case ActionType.UPLOAD_STATUS:
      setUploadStatus(payload.uploading);
      setUploadResult(payload.success);
      setTaskID(payload.id);
      RecorderStore.emitUpload();

    default:
      // do nothing
  }

});

export default RecorderStore;