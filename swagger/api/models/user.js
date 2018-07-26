var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: Date,
  lastModifiedDate: Date
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.lastModifiedDate = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;