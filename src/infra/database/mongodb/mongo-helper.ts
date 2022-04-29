import mongoose, { Document, Types } from 'mongoose';

import { Entity } from '@domain/entities/entity';

export const MongoHelper = {
  mapToClass: <T extends Entity>(doc: Document<T>, prototype: T): T => {
    if (!doc) return undefined;

    const { _id, ...rest } = doc.toObject();

    delete rest.__v;

    let obj = {
      id: _id.toString(),
      ...rest,
    } as T;

    obj = Object.setPrototypeOf(obj, prototype);

    return obj;
  },
  mapToDocument: <T extends Document>(obj: Entity): T => {
    const { id, ...rest } = obj;

    return {
      _id: id,
      ...rest,
    } as T;
  },
  objectId: (id: string): Types.ObjectId => {
    return new Types.ObjectId(id);
  },
};

export async function setupMongoose(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not found');
  }

  await mongoose.connect(process.env.DATABASE_URL);

  console.log('Connected to MongoDb server.');
}
