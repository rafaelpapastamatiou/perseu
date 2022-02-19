import { Document } from 'mongoose';

import { Entity } from '@domain/entities/entity';

export const MongoHelper = {
  mapToClass: <T extends Entity>(doc: Document<T>): T => {
    if (!doc) return undefined;

    const { _id, __v, ...rest } = doc.toObject();

    return {
      id: _id.toString(),
      ...rest,
    } as T;
  },
  mapToDocument: <T extends Document>(obj: Entity): T => {
    const { id, ...rest } = obj;

    return {
      _id: id,
      ...rest,
    } as T;
  },
};
