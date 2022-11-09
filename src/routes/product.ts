import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'

interface paramsProps {
  id: string
}

interface userSchema {
  name: string
  price: string
  description: string
}

export async function Product(fastify: FastifyInstance,) {
  fastify.get('/product', async (_, reply) => {
    try {
      const usersFound = await prisma.product.findMany()

      return reply.status(200).send(usersFound)
    } catch (error) {
      return reply.status(500).send({
        message: "Servidor error",
        error
      })
    }
  })

  fastify.post('/product', async (request, reply) => {
    try {
      const { name, price, description } = request.body as userSchema

      await prisma.product.create({
        data: {
          name,
          price,
          description
        }
      })

      return reply.status(201).send()
    } catch (error) {
      return reply.status(500).send({
        message: 'could not create the product',
        error
      })
    }
  })

  fastify.get('/product/:id', async (request, reply) => {
    try {
      const { id } = request.params as paramsProps

      const userFound = await prisma.product.findUnique({
        where: {
          id
        }
      })

      return reply.status(200).send(userFound)
    } catch (error) {
      return reply.status(404).send({
        message: 'User not found',
        error
      })
    }
  })

  fastify.put('/product/:id', async (request, reply) => {
    try {
      const { id } = request.params as paramsProps
      const { name, price, description } = request.body as userSchema

      const userUpdated = await prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          description
        }
      })

      return reply.status(200).send(userUpdated)
    } catch (error) {
      return reply.status(405).send({
        message: 'You are not allowed to modify the product',
        error
      })
    }
  })

  fastify.delete('/product/:id', async (request, reply) => {
    try {
      const { id } = request.params as paramsProps

      await prisma.product.delete({
        where: { id }
      })

      return reply.status(200).send()
    } catch (error) {
      return reply.status(405).send({
        message: 'You are not allowed to delete the product',
        error
      })
    }
  })
}
