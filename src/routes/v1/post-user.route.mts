import crypto from 'node:crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFreakResponse } from '../../post-freak-response.mjs';
import { verifyAccessToken, verifyClientToken } from '../../authentication.mjs';
import { addUser, RepositoryUser } from '../../repository.mjs';

interface PostUserBody {
  name: string;
  email: string;
  password: string;
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

  const body = request.body as PostUserBody;
  console.log('Body:');
  console.log(body);

  const user: RepositoryUser = {
    uuid: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    password: body.password,
  };
  addUser(user);

  return {
    status: 201,
    body: {
      uuid: user.uuid,
    },
  };
}
