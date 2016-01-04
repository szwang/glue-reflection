
export function onStop(e) {
  console.log('MediaRecorder.stop() called');
  var chunks = [];
  var clipName = prompt('enter a name');

  var blob = new Blob(chunks, { 'type': 'video/mp4; codecs=opus' });

  chunks = [];
  var vidURL = window.URL.createObjectURL(blob);
  console.log('vidurl: ', vidURL);
  video.src = vidURL;
  console.log('recorder stopped')
} 