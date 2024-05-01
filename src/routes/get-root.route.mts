import { FastifyReply, FastifyRequest } from 'fastify';
import { PostFreakResponse } from '../post-freak-response.mjs';

export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<PostFreakResponse> {
  return {
    status: 200,
    body: {
      name: 'postfreak',
      version: 'v1',
    },
  };
}
