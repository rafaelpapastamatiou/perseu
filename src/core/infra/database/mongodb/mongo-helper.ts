import { Document } from 'mongoose';

import { Entity } from '@core/domain/entities/entity';

export const MongoHelper = {
  mapToClass: <T extends Entity>(doc: Document<T>): T => {
    const { _id, ...rest } = doc.toObject();

    return {
      id: _id,
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
