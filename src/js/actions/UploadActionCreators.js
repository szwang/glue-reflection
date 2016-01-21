import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {
  uploadFile(percent, signResult) {
    Dispatcher.dispatch({
      type: ActionType.UPLOADING_TO_S3,
      percent: percent,
      id: signResult.filename
    })
  },

  uploadComplete(signResult) {
    Dispatcher.dispatch({
      type: ActionType.S3_UPLOAD_COMPLETE,
      id: signResult.filename
    })
  }

}