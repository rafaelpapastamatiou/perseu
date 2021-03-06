export type JsonWebTokenPayload = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export interface JsonWebToken {
  sign(payload: JsonWebTokenPayload): Promise<string>;
  verify(token: string): Promise<JsonWebTokenPayload | false>;
}
