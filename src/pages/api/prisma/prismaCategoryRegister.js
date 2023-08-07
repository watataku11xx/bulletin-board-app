const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドがPOST以外の場合はエラーを返す
  }

  const formData = req.body;
  // Create Category
  createCategory(formData.category_name).then((createdCategory) => {
    console.log('Created Category:', createdCategory);
  }).catch((error) => {
    console.error('Error creating Category:', error);
  });
  
  res.status(200).json({ message: 'フォームのデータを受け取りました！' });
}


// 新しいPostを作成
async function createCategory(category_name) {
  try {
    //Create post
    const newCategory = await prisma.category.create({
      data: {
        category_name,
      },
    });

    return newCategory;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
