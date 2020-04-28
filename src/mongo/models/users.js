const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// definimos esquema para nuestros usuarios
const usersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  data: {
    type: { age: Number, isMale: Boolean },
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});

// creamos el modelo
const model = mongoose.model('user', usersSchema);
module.exports = model;