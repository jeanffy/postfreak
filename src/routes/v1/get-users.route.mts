import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFreakResponse } from '../../post-freak-response.mjs';
import { verifyAccessToken, verifyClientToken } from '../../authentication.mjs';
import { findUsers } from '../../repository.mjs';

export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<PostFreakResponse> {
  const clientTokenresponse = verifyClientToken(request);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }
  const accessTokenResponse = verifyAccessToken(request);
  if (accessTokenResponse !== undefined) {
    return accessTokenResponse;
  }
  const users = findUsers();
  return {
    status: 200,
    body: users,
  };
}
