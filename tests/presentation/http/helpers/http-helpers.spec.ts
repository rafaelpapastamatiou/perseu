import {
  badRequest,
  created,
  ok,
  serverError,
  unauthorized,
} from '@presentation/http/helpers/http-helpers';

describe('Http Helpers', () => {
  it('ok()', () => {
    const body = { message: 'Testing ok() helper' };

    expect(ok(body)).toEqual({
      statusCode: 200,
      body,
    });
  });

  it('created()', () => {
    const body = { message: 'Testing created() helper' };

    expect(created(body)).toEqual({
      statusCode: 201,
      body,
    });
  });

  it('badRequest()', () => {
    const body = { message: 'Testing badRequest() helper' };

    expect(badRequest(body)).toEqual({
      statusCode: 400,
      body,
    });
  });

  it('unauthorized()', () => {
    const body = { message: 'Testing unauthorized() helper' };

    expect(unauthorized(body)).toEqual({
      statusCode: 401,
      body,
    });
  });

  it('serverError()', () => {
    const body = { message: 'Testing serverError() helper' };

    expect(serverError(body)).toEqual({
      statusCode: 500,
      body,
    });
  });
});
