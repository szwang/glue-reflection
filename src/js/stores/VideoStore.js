import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';
import _ from 'lodash';

const _video = { 
  play: false,
  array: [
    'sail-cat', //funny
    'larvae', //disgusting
    'highway-car', //shocking
    'nutcracker', //painful
    // 'military-fam', //touching
    'surprised-kitty', //cute
    'inochi-kuni', //confusing
    'barking-cat', //cringe-inducing
    'snake', //surprise
    'hey-ron', //
    'daddy-long-legs', //disgust 
    'lion-reunion', //heart-warming
    'silence-of-love', //sad
    'jetpack-fail'
  ]
};

const CHANGE_EVENT = 'change';

function playVideo() {
  _video.play = true;
}

const VideoStore = assign({}, EventEmitter.prototype, {
  // functions for modals
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getPlayStatus() {
    return _video.play;
  },
  getRandomVideo() {
    return _.sample(_video.array);
  }
})

VideoStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.BEGIN_VIDPLAY:
      playVideo();
      VideoStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default VideoStore;