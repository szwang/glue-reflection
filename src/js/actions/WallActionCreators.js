import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import _ from 'lodash';

export default {

  getVideos(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/selected');
    var videos = [];
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      videos.push(snapshot.val());
      // console.log('videos: ', snapshot.val(), videos.length)
      if(videos.length === 12) {
        var shuffled = _.shuffle(videos);

        Dispatcher.dispatch({
          type: ActionType.GETTING_WALL_VIDEOS,
          vidArray: shuffled
        })

        return;
      }
    })
  }
}