import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  _id: Number,
  productId: Number,
  authorId: Number,
  text: String,
  createdAt: Date,
  lastModifiedDate: Date
});

reviewSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.lastModifiedDate = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

var Review = mongoose.model('Review', reviewSchema);

export default Review;