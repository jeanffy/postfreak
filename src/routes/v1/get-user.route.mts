import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFreakResponse } from '../../post-freak-response.mjs';
import { verifyAccessToken, verifyClientToken } from '../../authentication.mjs';
import { findUserByUuid } from '../../repository.mjs';

interface GetUserPathParams {
  uuid: string;
}

export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<PostFreakResponse> {
  const clientTokenresponse = verifyClientToken(request);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }
  const accessTokenResponse = verifyAccessToken(request);
  if (accessTokenResponse !== undefined) {
    return accessTokenResponse;
  }

  const uuid = (request.params as GetUserPathParams).uuid;

  const user = findUserByUuid(uuid);
  if (user === undefined) {
    return {
      status: 404,
      body: {
        message: `User with ${uuid} does not exist`,
      },
    };
  }

  return {
    status: 200,
    body: user,
  };
}
