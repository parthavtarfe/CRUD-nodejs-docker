const mongoose_instance = require('mongoose');
const Schema = mongoose_instance.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});
let product = mongoose_instance.model('product', productSchema);

module.exports = product;