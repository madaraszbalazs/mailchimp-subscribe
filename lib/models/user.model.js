/* eslint no-useless-escape: 0 */
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: '{VALUE} is not a valid email address!',
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
