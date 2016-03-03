import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';
import firebaseUtils from '../utils/FirebaseUtils';

export default {

  getVideos(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/selected');
    var videos = [];
    firebaseUtils.getSource(source)
    .then((link) => {
      Dispatcher.dispatch({
        type: ActionType.GOT_WALL_SOURCE,
        src: link
      })
      firebaseRef.orderByKey().on('child_added', (snapshot) => {
        var link = 'https://s3.amazonaws.com/recordrtc-test/' + snapshot.val() + '.webm';
        videos.push(link);
        if(videos.length === 12) {
          var shuffled = _.shuffle(videos);
          Dispatcher.dispatch({
            type: ActionType.GETTING_WALL_VIDEOS,
            vidArray: shuffled
          })

          return;
        }
      })
    
    })

  }
}