import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {

  getVideos(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/selected');
    var videos = [];
    var src;
    firebaseUtils.getSource(source)
    .then((link) => {
      src = link;
      console.log(src)
    })
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      videos.push(snapshot.val());
      // console.log('videos: ', snapshot.val(), videos.length)
      if(videos.length === 12) {
        var shuffled = _.shuffle(videos);

        Dispatcher.dispatch({
          type: ActionType.GETTING_WALL_VIDEOS,
          vidArray: shuffled,
          src: src
        })

        return;
      }
    })
  }
}