import Dispatcher from '../AppDispatcher';
import ImageUtils from '../utils/ImageUtils';
import ActionType from '../AppConstants';

export default {
  submitPhoto(imgURL) {
    ImageUtils.postPhoto(imgURL)
    .then((json) => {
      Dispatcher.dispatch({
        type: ActionType.UPLOAD_RESPONSE,
        message: json,
      })
    })
    .catch((err) => {
      console.log('submitPhoto function error: ', err);
    })
  }
}