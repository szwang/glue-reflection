import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {

  getSongs(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/selected');
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      console.log(snapshot.val(), snapshot.key());
      Dispatcher.dispatch({
        type: ActionType.GETTING_WALL_VIDEOS,
        video: snapshot.val()
      })
    })
  }
}