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

      var ref = new Firebase('https://reactionwall.firebaseio.com/videos/');

      ref.orderByKey().on('child_added', (snapshot) => {
        var selected = snapshot.val().selected;
        console.log('selected', selected)

        var shuffled = _.slice(_.shuffle(selected), 0, 7);

        console.log(shuffled, 'shuffled')
      })



      //TODO refactor query
      firebaseRef.orderByKey().on('child_added', (snapshot) => {
        console.log('snapshot', snapshot.val())
        var link = 'https://s3.amazonaws.com/recordrtc-test/' + snapshot.val() + '.webm';
        videos.push(link);
        if(videos.length === 7) {
          var shuffled = _.shuffle(videos);
          Dispatcher.dispatch({
            type: ActionType.GETTING_WALL_VIDEOS,
            vidArray: shuffled
          })

          return;
        }
      })
    
    })

  },

  canPlayVideo() {
    Dispatcher.dispatch({
      type: ActionType.CAN_PLAY_VIDEO
    })
  },

  voteVideo(id) {
    //set vote on a video
    //create new node of voted videos
    /*
    structure: "value", 
      voted: {
        [id] : [vote#],
        [id] : [vote#]
      }
    */

    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + source + '/selected')

    //
  }
}