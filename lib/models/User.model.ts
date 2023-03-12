import bcrypt from 'bcrypt';
import { Model, Schema } from 'mongoose';
import createModel from '../createModel';

export interface IUser {
  _id: string;
  username: string;
  password: string;
}
type UserModel = Model<IUser, {}>;
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function(next) {
  var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(10, function(err, salt) {
  if (err) return next(err);

  // hash the password using our new salt
  bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
  });
});


});



export default createModel<IUser, UserModel>('User', UserSchema);
