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

      var ref = new Firebase('https://reactionwall.firebaseio.com/videos/' + source);

      ref.orderByKey().on('child_added', (snapshot) => {

        if(snapshot.key() === "selected") {
          var selected = snapshot.val();
          var shuffled = _.slice(_.shuffle(selected), 0, 7);
          // var links = _.map(shuffled, (val) => {
          //   console.log(val)
          //   return 'https://s3.amazonaws.com/recordrtc-test/' + val + '.webm';
          // })
          Dispatcher.dispatch({
            type: ActionType.GETTING_WALL_VIDEOS,
            vidArray: shuffled
          }) 
        }
      })
    
    })

  },

  canPlayVideo() {
    Dispatcher.dispatch({
      type: ActionType.CAN_PLAY_VIDEO
    })
  },

  vote(id, video) {
    //set vote on a video
    //create new node of voted videos
    /*
    structure: "value", 
      voted: {
        [id] : [vote#],
        [id] : [vote#]
      }
    */

    console.log('entering vote function with params', id, video)

    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + video);
    
    var votes = null;

    firebaseRef.on("child_added", function(snap) {
      if(snap.key() === 'voted') {
        votes = snap.val();
      }
    });

    // length will always equal count, since snap.val() will include every child_added event
    // triggered before this point
    firebaseRef.once("value", function(snap) {
      var newVal = true;

      if(votes) {
        console.log(votes)
        var keys = _.keys(votes);
        _.forEach(keys, (val) => {
          console.log(keys, val)
          if(val == id) {
            console.log(val)
            votes[id]++;
            console.log(votes);
            newVal = false;

            firebaseRef.child('voted').set(votes);
          }
        })

        if(newVal) {
          console.log('adding new key')
          var obj = {};
          obj[id] = 1;
          firebaseRef.child('voted').update(obj);
        }


      } else {
        var obj = {};
        obj[id] = 1;

        firebaseRef.child('voted').set(obj) 
      }
    });

  

    // firebaseRef.orderByKey().on('child_added', (snapshot) => {
    //   console.log(snapshot.val(), snapshot.key())
    // })

    // firebaseRef.child(id).set()
    //
  }
}

