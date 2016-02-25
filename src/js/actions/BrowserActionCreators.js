import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {
  getGifs() {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/');

    var reactions = [];
    var data = {};

    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      console.log('key: ', snapshot.key())
      console.log('val: ', snapshot.val().reactions)
      var reactions = snapshot.val().reactions;
      var length = _.keys(reactions).length;
      console.log(snapshot.key(), 'has', length, 'reactions');

      var random = _.random(length);

      _.forEach(reactions, (val, i) => {
        console.log('in for loop',reactions, val, i)
        if(i === random) {
          console.log('putting into data obj', snapshot.key(), val.id)
          data[snapshot.key()] = val.id;
          return;
        }
      })

      console.log('data!!', data)
    })
  }
}