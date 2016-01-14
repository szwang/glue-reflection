import Dispatcher from '../AppDispatcher';
import ImageUtils from '../utils/ImageUtils';
import ActionType from '../AppConstants';

export default {
  clickPlay() {
    Dispatcher.dispatch({
      type: ActionType.BEGIN_RECORD
    })
  },

  beginUpload() {
    Dispatcher.dispatch({
      type: ActionType.BEGIN_UPLOAD,
      uploading: true
    })
  },

  postFiles(data) {
    console.log('data in actionCreator: ', data);
    var body = JSON.stringify(data);

    fetch('/videoUpload', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body  
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log('received response: ', json)
      Dispatcher.dispatch({
        type: ActionType.UPLOAD_STATUS,
        uploading: false,
        success: json.success
      })
    })
    .catch((err) => {
      console.log('error: ', err);
    })
  }

}
