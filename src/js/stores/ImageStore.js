import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _image = { uploadResponse: null, id: false };

const CHANGE_EVENT = 'change';

function setUploadResponse(status) {
  _image.uploadResponse = status;
  console.log('_image: ', _image)
}

function setTaskID(id) {
  _image.id = id;
  console.log('id from store: ', id);
}

const ImageStore = assign({}, EventEmitter.prototype, {
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
  getUploadStatus() { //returns bool
    return _image.uploadResponse;
  },
  getTaskID() {
    return _image.id;
  }
})

ImageStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.UPLOAD_RESPONSE:
      if(payload.message.error) {
        console.log('error in upload: ', payload.message.error);
      }
      setUploadResponse(payload.message.success);
      setTaskID(payload.message.id);
      ImageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default ImageStore;