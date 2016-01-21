import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {
  uploadFile(percent) {
    Dispatcher.dispatch({
      type: UPLOADING_TO_S3,
      percent: percent
    })
  },

  uploadComplete(file) {
    if(file.type === 'video/webm') {
      console.log('file: ', file)
      Dispatcher.dispatch({
        type: S3_UPLOAD_COMPLETE,
        id: file
      })
    }
  }

}