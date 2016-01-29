import Firebase from 'firebase';

export function getSource(name) {
  return new Promise((resolve, reject) => {
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + vidName + '/src');
    firebaseRef.on('value', (snapshot) => {
      resolve(snapshot.val());
    })
  })
}


