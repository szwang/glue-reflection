import Dispatcher from '../AppDispatcher';
import ActionType from '../AppConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

const _videos = { 
  links: []
};

const CHANGE_EVENT = 'change';

function setWallVideos(link) {
  _videos.links.push(link);
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
      console.log('in wall store', payload)
      setWallVideos(payload.video);
      WallStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default WallStore;