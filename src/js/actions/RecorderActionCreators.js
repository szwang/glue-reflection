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

  getSignedUrl(fileType) {
    var queryString = '?video=' + encodeURIComponent(fileType.video);
    if(fileType.audio) {
      queryString += '&audio=' + encodeURIComponent(fileType.audio);
    }
    fetch('/sign' + queryString, {
      method: 'get'
    })
    .then((response) => {
      console.log('response: ', response);
      return response.json();
    })
    .then((json) => {
      console.log('json: ', json);
      Dispatcher.dispatch({
        type: ActionType.GOT_SIGNED_URL,
        audioUrl: json.audioSignedUrl,
        videoUrl: json.videoSignedUrl,
        name: json.fileName
      })
    })
  },

  testUrl() {
    fetch('/test')
    .then((response) => {
      console.log('response', response);
      return response.json();
    })
    .then((json) => {
      console.log(json)
    })
  }
}


