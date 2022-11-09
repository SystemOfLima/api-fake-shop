import Fastify from 'fastify'
import { Product } from './routes/product'

async function main() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(Product)

  fastify.get("/", async (_, reply) => {
    return reply.send("Olá")
  })

  await fastify.listen({ port: 3333 })
}

main()