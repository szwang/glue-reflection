import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {

  getVideos(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/selected');
    var videos = [];
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      videos.push(snapshot.val());
      if(videos.length === 8) {
        console.log('dispatching videos: ', videos)
        Dispatcher.dispatch({
          type: ActionType.GETTING_WALL_VIDEOS,
          vidArray: videos
        })
      }
    })
  }
}