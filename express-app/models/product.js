import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: String,
  size: {
    type: String,
    required: true
  },
  createdAt: Date,
  lastModifiedDate: Date
});

productSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.lastModifiedDate = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;