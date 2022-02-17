import jsonwebtoken from 'jsonwebtoken';

import {
  JsonWebToken,
  JsonWebTokenPayload,
} from '@core/application/providers/json-web-token';

export class Jwt implements JsonWebToken {
  async sign(payload: JsonWebTokenPayload): Promise<string> {
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 24 * 7,
    });

    return token;
  }

  async verify(token: string): Promise<JsonWebTokenPayload | false> {
    try {
      const decoded = jsonwebtoken.verify(
        token,
        process.env.JWT_SECRET,
      ) as JsonWebTokenPayload;

      return decoded;
    } catch (err) {
      return false;
    }
  }
}
