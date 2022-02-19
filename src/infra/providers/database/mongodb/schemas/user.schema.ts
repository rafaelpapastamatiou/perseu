import * as mongoose from 'mongoose';

import { User } from '@domain/entities/user';

export type UserDocument = User & mongoose.Document;

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

export const UserModel = mongoose.model('User', UserSchema);
