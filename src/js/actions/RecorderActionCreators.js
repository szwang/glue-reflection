import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {
  clickPlay(bool) { //TODO change func names
    Dispatcher.dispatch({
      type: ActionType.RECORD,
      status: bool
    })
  },

  playVid(bool) {
    Dispatcher.dispatch({
      type: ActionType.VIDPLAY,
      status: bool
    })
  },

  beginUpload(bool) {
    Dispatcher.dispatch({
      type: ActionType.UPLOAD,
      uploading: bool
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
  },

  getSignedURL(fileName, fileType) {
    var queryString = '?objectName=' + fileName + '&contentType=' + fileType;
    fetch('/sign' + queryString, {
      method: 'get'
    })
    .then((response) => {
      console.log('response: ', response);
      return response.json();
    })
    .then((json) => {
      console.log('json: ', json)
    })
  }

}
