import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {
  getAllGifs() {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/');
    //to do: don't send gifs that aren't accessible
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      var selected = snapshot.val().selected;
      var random = _.random(selected.length - 1); 
      console.log('querying random #' + random, snapshot.key(), snapshot.val())
      _.forEach(selected, (val, i) => {
        if(i == random) {
          console.log("gif #" + i, val, snapshot.key())
          Dispatcher.dispatch({
            type: ActionType.GOT_GIFS,
            gif: val,
            video: snapshot.key()
          })
          return false;
        }
      })
    })

  }
}