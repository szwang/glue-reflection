var kue = require('kue');
var jobs = kue.createQueue();

function testJob() {
  var job = jobs.create('test_job');
  job.save();
}


jobs.process('test_job', function(job, done) {
  console.log('Job', job.id, 'is done');
  done && done();
})

setInterval(testJob, 3000)