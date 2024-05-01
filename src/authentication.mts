import { FastifyRequest } from 'fastify';
import { PostFreakResponse } from './post-freak-response.mjs';
import { findUserByEmail } from './repository.mjs';

const validClientToken = 'some-client-token';
const validAccessToken = 'some-access-token';

export function verifyClientToken(request: FastifyRequest): PostFreakResponse | undefined {
  const clientToken = request.headers['x-client-token'];
  if (clientToken === undefined) {
    return { status: 422, body: { message: 'X-Client-Token needed' } };
  }
  if (clientToken !== validClientToken) {
    return { status: 403, body: { message: 'Invalid X-Client-Token' } };
  }
  return undefined;
}

export function verifyAccessToken(request: FastifyRequest): PostFreakResponse | undefined {
  const auth = request.headers.authorization;
  if (auth === undefined) {
    return { status: 422, body: { message: 'Bearer authorization needed' } };
  }
  if (!auth.startsWith('Bearer ')) {
    return { status: 401, body: { message: 'Invalid bearer authorization' } };
  }
  const accessToken = auth.slice('Bearer '.length);
  if (accessToken !== validAccessToken) {
    return { status: 403, body: { message: 'Invalid access token' } };
  }
  return undefined;
}

export function loginUser(email: string, password: string): string | undefined {
  const user = findUserByEmail(email);
  if (user === undefined) {
    return undefined;
  }
  if (user.password !== password) {
    return undefined;
  }
  return validAccessToken;
}
