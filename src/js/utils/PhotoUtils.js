import fetch from 'whatwg-fetch';

export function submitPhoto(imgURL) {
  var body = JSON.stringify({ imgURL: imgURL });
  return new Promise((resolve, reject) => {
    window.fetch('/img', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
  })
  .then((response) => {
    console.log('success! ', response);
  })
}