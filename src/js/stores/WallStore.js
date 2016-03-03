import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';
import _ from 'lodash';

const _videos = { 
  links: [],
  src: null
};

const CHANGE_EVENT = 'change';

function setWallVideos(payload) {
  _videos.links = payload.vidArray;
}

function setSource(link) {
  _videos.src = link;
}

// function chunkVideos() {
//   var c =  _.chunk(_videos.links, 2)
//   _videos.div.left = c[0];
//   _videos.div.right = c[1];
//   _videos.div.top = _.concat(c[2], c[3]);
//   _videos.div.bottom = _.concat(c[4], c[5]);
//   WallStore.emitChange();
// }

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

    default:
      // do nothing
  }

});

export default WallStore;