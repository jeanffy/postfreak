import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { handler as getRootRouteHandler } from './routes/get-root.route.mjs';
import { handler as getPublicRouteHandlerV1 } from './routes/v1/get-public.route.mjs';
import { handler as postLoginRouteHandlerV1 } from './routes/v1/post-login.route.mjs';
import { handler as getUsersRouteHandlerV1 } from './routes/v1/get-users.route.mjs';
import { handler as postUserRouteHandlerV1 } from './routes/v1/post-user.route.mjs';
import { handler as getUserRouteHandlerV1 } from './routes/v1/get-user.route.mjs';
import { PostFreakResponse } from './post-freak-response.mjs';

const server = fastify();

async function handleRoute(
  request: FastifyRequest,
  reply: FastifyReply,
  handler: (request: FastifyRequest, reply: FastifyReply) => Promise<PostFreakResponse>
) {
  const response = await handler(request, reply);
  reply.statusCode = response.status;
  return response.body;
}

server
  .addHook('onRequest', (request, reply) => {
    console.log(`--> ${request.method} ${request.url}`);
    console.log('Headers:');
    console.log(request.headers);
    return Promise.resolve();
  })
  .addHook('onSend', (request, reply) => {
    console.log(`<-- ${request.method} ${request.url} ${reply.statusCode}`);
    return Promise.resolve();
  })
  .get('/', (request, reply) => handleRoute(request, reply, getRootRouteHandler))
  .get('/v1/public', (request, reply) => handleRoute(request, reply, getPublicRouteHandlerV1))
  .post('/v1/login', (request, reply) => handleRoute(request, reply, postLoginRouteHandlerV1))
  .get('/v1/users', (request, reply) => handleRoute(request, reply, getUsersRouteHandlerV1))
  .post('/v1/users', (request, reply) => handleRoute(request, reply, postUserRouteHandlerV1))
  .get('/v1/users/:uuid', (request, reply) => handleRoute(request, reply, getUserRouteHandlerV1));

await server.listen({
  host: '127.0.0.1',
  port: 3000,
});

console.log('Demo server listening on 127.0.0.1:3000');
