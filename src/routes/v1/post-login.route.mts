import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFreakResponse } from '../../post-freak-response.mjs';
import { loginUser, verifyClientToken } from '../../authentication.mjs';

interface PostLoginBody {
  email: string;
  password: string;
}

export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<PostFreakResponse> {
  const clientTokenresponse = verifyClientToken(request);
  if (clientTokenresponse !== undefined) {
    return clientTokenresponse;
  }

  const body = request.body as PostLoginBody;
  console.log('Body:');
  console.log(body);

  const accessToken = loginUser(body.email, body.password);
  if (accessToken !== undefined) {
    return {
      status: 200,
      body: {
        accessToken
      }
    };
  }

  return {
    status: 401,
    body: {}
  };
}
