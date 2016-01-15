import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {
  clickPlay() {
    Dispatcher.dispatch({
      type: ActionType.BEGIN_RECORD
    })
  },

  beginVideo() {
    Dispatcher.dispatch({
      type: ActionType.BEGIN_VIDPLAY
    })
  },

  beginUpload() {
    Dispatcher.dispatch({
      type: ActionType.BEGIN_UPLOAD,
      uploading: true
    })
  },

  postFiles(data) {
    var body = JSON.stringify(data);
    var id = data.name;

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
      Dispatcher.dispatch({
        type: ActionType.UPLOAD_STATUS,
        uploading: false,
        success: json.success,
        id: id
      })
    })
    .catch((err) => {
      console.log('error: ', err);
    })
  }

}
