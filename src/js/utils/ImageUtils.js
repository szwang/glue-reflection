
module.exports = {
  postPhoto(imgURL) {
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
      response.json()
      .then((json) => {
        resolve(json);
      })
    })
    .catch((err) => {
      console.log('error: ', err);
      reject(err);
    })
  }
}