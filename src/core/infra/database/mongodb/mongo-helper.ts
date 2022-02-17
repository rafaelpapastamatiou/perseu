import { Document } from 'mongoose';

type MongoMappedDocument = {
  id: string;
};

interface IMongoHelper {
  mapToClass: <T extends MongoMappedDocument>(doc: Document) => T;
  mapToDocument: <T extends Document>(obj: MongoMappedDocument) => T;
}

export const MongoHelper: IMongoHelper = {
  mapToClass: <T extends MongoMappedDocument>(doc: Document<T>): T => {
    const { _id, ...rest } = doc.toObject();

    return {
      id: _id,
      ...rest,
    } as T;
  },
  mapToDocument: <T extends Document>(obj: MongoMappedDocument): T => {
    const { id, ...rest } = obj;

    return {
      _id: id,
      ...rest,
    } as T;
  },
};
