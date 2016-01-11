
module.exports = {
  postPhoto(data) {
    var body = JSON.stringify(data);
    return new Promise((resolve, reject) => {
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
          console.log('received response: ', json)
          resolve(json);
        })
      })
      .catch((err) => {
        console.log('error: ', err);
        reject(err);
      })
    })
  }
}