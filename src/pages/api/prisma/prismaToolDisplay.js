const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {

    //search post
    const { id } = req.query;
    searchPost(parseInt(id)).then((post) => {
        res.status(200).json(post);
    }).catch((error) => {
        console.error('Error searching post:', error);
    });
}

//post_idからpostレコードを取得, カテゴリーの取得
async function searchPost(post_id){
    try {
        const selectPost = await prisma.post.findUnique({
            where: {
                post_id: post_id,
            },
            include: {
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });

        const categoryNames = selectPost.categories.map(category => category.category.categoryname);

        return {
            post: selectPost,
            categoryNames: categoryNames,
        };
    } catch (error) {
        console.error('Error searching post:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}