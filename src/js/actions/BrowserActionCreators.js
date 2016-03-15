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
      _.forEach(selected, (val, i) => {
        if(i == random) {
          Dispatcher.dispatch({
            type: ActionType.GOT_GIFS,
            gif: val, //gif ID
            video: snapshot.key() //video name
          })
          return false;
        }
      })
    })
  }
}