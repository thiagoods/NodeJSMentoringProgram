import mongoose from 'mongoose';
import populateDB from './populate';

mongoose.Promise = global.Promise;

function startDB() {
  mongoose.connect('mongodb://localhost/mydb')
    .then(() =>  console.log('connection succesful'))
    .then(() => populateDB())
    .catch((err) => console.error(err));

  return mongoose.connection;
}

export default startDB;