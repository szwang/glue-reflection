import Dispatcher from '../AppDispatcher';
import ImageUtils from '../utils/ImageUtils';
import ActionType from '../AppConstants';

export default {
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
    })
    .catch((err) => {
      console.log('error: ', err);
    })
  }
  
}
