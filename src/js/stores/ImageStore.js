import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _image = { uploadResponse: null };

const CHANGE_EVENT = 'change';

function setUploadResponse(res) {
  _image.uploadResponse = res;
  console.log('_image: ', _image)
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
  }
})

ImageStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.UPLOAD_RESPONSE:
      setUploadResponse(payload.message.success);
      ImageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default ImageStore;