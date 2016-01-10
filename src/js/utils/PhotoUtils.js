
module.exports = {
  submitPhoto(imgURL) {
    var body = JSON.stringify({ imgURL: imgURL });
    fetch('/img', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((response) => {
      console.log('success! ', response);
    })
  }
}