import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     data: {
    //     name: 'Alice',
    //     email: 'alice@prisma.io',
    //     posts: {
    //         create: { title: 'Hello World' },
    //     },
    //     profile: {
    //         create: { bio: 'I like turtles' },
    //     },
    //     },
    // })

    const allUsers = await prisma.user.findMany();
    console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


export default function handler(req, res) {
  res.status(200).json({message: "fetch prisma data"});
}