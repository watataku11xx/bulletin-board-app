const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {

    //search category 
    searchCategory().then((categories) => {
        res.status(200).json(categories);
    }).catch((error) => {
        console.error('Error searching category:', error);
    });
}

//categoryレコードを取得
async function searchCategory(){
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.error('Error searching category:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}