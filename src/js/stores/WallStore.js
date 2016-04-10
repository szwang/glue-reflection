import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';
import _ from 'lodash';

const _videos = { 
  links: [],
  src: null,
  numLoaded: 0
};

const CHANGE_EVENT = 'change';
const PLAY_ALL_EVENT = 'play';

function setWallVideos(payload) {
  _videos.links = payload.vidArray;
}

function setSource(link) {
  _videos.src = link;
}

function setLoadStatus() {
  _videos.numLoaded++;
  if(_videos.numLoaded === 7) {
    console.log('all videos loaded')
    WallStore.emitPlay();
  }
}

const WallStore = assign({}, EventEmitter.prototype, {
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
  getReactionVideos() {
    return _videos.links;
  },
  getSourceVideo() {
    return _videos.src;
  },
  getDiv(position) {
    return _videos.div[position];
  },

  // for when all videos are loaded
  emitPlay() {
    this.emit(PLAY_ALL_EVENT);
  },
  addPlayListener(callback) {
    this.on(PLAY_ALL_EVENT, callback);
  },
  removePlayListener(callback) {
    this.on(PLAY_ALL_EVENT, callback);
  }
})

WallStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.GETTING_WALL_VIDEOS:
      setWallVideos(payload);
      WallStore.emitChange();
      break;

    case ActionType.GOT_WALL_SOURCE:
      setSource(payload.src);
      break;

    case ActionType.CAN_PLAY_VIDEO:
      setLoadStatus();
      break;

    default:
      // do nothing
  }

});

export default WallStore;