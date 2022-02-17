import mongoose, { Document } from 'mongoose';

import { User } from '@modules/auth/domain/entities/user';

export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

export const UserModel = mongoose.model('User', UserSchema);
