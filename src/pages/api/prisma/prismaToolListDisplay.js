const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {

    // search post list
    searchPostList().then((postList) => {
        res.status(200).json(postList);
    }).catch((error) => {
        console.error('Error searching post List:', error);
    });
}

//postレコードを取得
async function searchPostList(){
    try {
        const posts = await prisma.post.findMany();
        return posts;
    } catch (error) {
        console.error('Error searching post List:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}