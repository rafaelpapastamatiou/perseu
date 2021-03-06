import { JsonWebTokenPayload } from '@application/providers/json-web-token';
import { Jwt } from '@infra/jwt';
import jsonwebtoken from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
  verify: jest.fn().mockReturnValue({
    email: 'fakeuser@email.com',
    firstName: 'fake',
    lastName: 'user',
  }),
}));

const makeSut = () => {
  const sut = new Jwt();

  return { sut };
};

describe('Jwt', () => {
  it('should be able to sign a token', async () => {
    const { sut } = makeSut();

    const payload: JsonWebTokenPayload = {
      email: 'fakeuser@email.com',
      firstName: 'fake',
      lastName: 'user',
      userId: 'fake-id',
    };

    const token = await sut.sign(payload);

    expect(token).toEqual('token');
  });

  it('should be able to verify a token and return decoded data', async () => {
    const { sut } = makeSut();

    const decoded = await sut.verify('token');

    expect(decoded).toEqual({
      email: 'fakeuser@email.com',
      firstName: 'fake',
      lastName: 'user',
    });
  });

  it('should return false if jsonwebtoken.verify throws', async () => {
    const { sut } = makeSut();

    jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce(() => {
      throw new Error();
    });

    const decoded = await sut.verify('token');

    expect(decoded).toEqual(false);
  });
});
