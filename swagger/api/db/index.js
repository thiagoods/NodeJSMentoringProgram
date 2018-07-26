var mongoose = require('mongoose');
var populateDB = require('./populate');

mongoose.Promise = global.Promise;

function startDB() {
  mongoose.connect('mongodb://localhost/mydb')
    .then(() =>  console.log('connection succesful'))
    .then(() => populateDB())
    .catch((err) => console.error(err));

  return mongoose.connection;
}

module.exports = startDB;