import Dispatcher from '../AppDispatcher';
import ImageUtils from '../utils/ImageUtils';
import ActionType from '../AppConstants';

function isFirefox() {
  return !!navigator.mozGetUserMedia;
}

export default {
  postFiles(data) {
    console.log('data in actionCreator: ', data)
  }
}