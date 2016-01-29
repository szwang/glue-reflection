import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _videos = { 
  links: [],
  src: null
};

const CHANGE_EVENT = 'change';

function setWallVideos(payload) {
  _videos.links = payload.vidArray;
  _videos.src = payload.src;
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
  }
})

WallStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.GETTING_WALL_VIDEOS:
      console.log('wall videos: ', payload)
      setWallVideos(payload);
      WallStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default WallStore;