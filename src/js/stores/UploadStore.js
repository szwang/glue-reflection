import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _upload = { 
  percent: null,
  id: null
};

const CHANGE_EVENT = 'change';

function setUploadProgress(percent) {
  _upload.percent = percent;
}

function setID(id) {
  _upload.id = id;
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
  getUploadPercent() {
    return _upload.percent;
  },
  getTaskId() {
    return _upload.id;
  }
})

UploadStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.UPLOADING_TO_S3:
      setUploadProgress(payload.percent);
      if(payload.percent === 100) setID(payload.id);
      UploadStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default UploadStore;