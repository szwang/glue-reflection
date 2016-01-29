import Firebase from 'firebase';

export default {
  getSource(name) {
    return new Promise((resolve, reject) => {
      var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + name + '/src');
      firebaseRef.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    })
  }
} 



