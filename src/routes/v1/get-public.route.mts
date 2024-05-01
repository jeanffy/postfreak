import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFreakResponse } from '../../post-freak-response.mjs';

export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<PostFreakResponse> {
  return {
    status: 200,
    body: {
      url: `${request.method} ${request.url}`,
      name: 'postfreak',
    },
  };
}
