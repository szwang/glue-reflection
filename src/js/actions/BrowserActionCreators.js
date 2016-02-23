import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {
  getGifs() {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/')

    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      console.log('key: ', snapshot.key())
      console.log('val: ', snapshot.val())
    })
  }
}