import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _videos = { 
  links: []
};

const CHANGE_EVENT = 'change';

function setWallVideos(linkArray) {
  _videos.links = linkArray;
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
  getWallVideos() {
    return _videos.links;
  }
})

WallStore.dispatchToken = Dispatcher.register((payload) => {

  switch(payload.type) {
    case ActionType.GETTING_WALL_VIDEOS:
      setWallVideos(payload.vidArray);
      WallStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default WallStore;