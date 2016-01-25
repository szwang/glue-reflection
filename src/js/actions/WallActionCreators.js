import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';

export default {

  getVideos(source) {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/'+ source +'/reactions');
    var videos = [];
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      videos.push(snapshot.val());
      // console.log('videos: ', snapshot.val(), videos.length)
      if(videos.length === 15) {
        Dispatcher.dispatch({
          type: ActionType.GETTING_WALL_VIDEOS,
          vidArray: videos
        })
      }
    })
  }
}