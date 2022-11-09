import { FastifyInstance } from "fastify";

interface paramsType {
  id: string | null
}

export async function Product(fastify: FastifyInstance,) {
  fastify.get('/product', async (_, reply) => {
    return reply.send([])
  })

  fastify.get('/product/:id', async (request, reply) => {
    const { id } = request.params as paramsType

    return reply.send(`Get user ${id}`)
  })

  fastify.put('/product/:id', async (request, reply) => {
    const { id } = request.params as paramsType

    return reply.send(`Get user ${id}`)
  })

  fastify.delete('/product/:id', async (request, reply) => {
    const { id } = request.params as paramsType
    return reply.send(`Delete user a ${id}`)
  })
}
