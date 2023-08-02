
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {

    //search commnet 
    const { id } = req.query;
    searchcommnet(parseInt(id)).then((commnet) => {
        res.status(200).json(commnet);
    }).catch(() => {
        console.error('Error searching commnet:', error);
    });
}

//commnet_idからcommnetレコードを取得
async function searchcommnet(post_id){
    try {
        const selectcommnet = await prisma.comment.findMany({
        where: {
            post_id: post_id
        }
        })
        return selectcommnet;
    } catch (error) {
        console.error('Error searching commnet:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}