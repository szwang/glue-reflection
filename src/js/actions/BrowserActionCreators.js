import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {
  getAllGifs() {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/');
    //to do: find better randomized algorithm
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      var reactions = snapshot.val().reactions;
      var length = _.keys(reactions).length;
      var random = _.random(reactions.length); 
      var counter = 0;

      _.forEach(reactions, (val, i) => {
        // var selected = val.selected === true;
        // console.log('selected', selected)
        if(counter == random) {
          Dispatcher.dispatch({
            type: ActionType.GOT_GIFS,
            gif: val.id,
            video: snapshot.key()
          })
          return false;
        }
        counter ++;
      })
    })

  }
}