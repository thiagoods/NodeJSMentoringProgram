import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const citySchema = new Schema({
	_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capital: Boolean,
  location: {
    lat: Number,
    long: Number
  },
  createdAt: Date,
  lastModifiedDate: Date
});

citySchema.pre('save', function(next) {
  var currentDate = new Date();

  this.lastModifiedDate = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

const City = mongoose.model('City', citySchema);

export default City;