import { use } from 'react';

const { PrismaClient } = require('@prisma/client');

// PrismaClientのインスタンスを作成します
const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドがPOST以外の場合はエラーを返す
  }

  const formData = req.body; // リクエストボディからフォームのデータを取得
  console.log(formData);
  // Create post
  createPost(formData.toolName, formData.toolOverView, formData.sessionEmail).then((createdPost) => {
    console.log('Created Post:', createdPost);
  }).catch((error) => {
    console.error('Error creating post:', error);
  });
  
  res.status(200).json({ message: 'フォームのデータを受け取りました！' });
}


// 新しいPostを作成
async function createPost( title, content, email) {
  try {
    //Search User
    const userId = await searchUser(email)
    console.log('Search UserId:', userId);
    //Create post
    const newPost = await prisma.post.create({
      data: {
        user: { connect: { id: userId } }, 
        title,
        content,
        //schema.prismaでpost_dateをデフォルトで設定しているのに、なぜか必須
        post_date: new Date(),
      },
    });

    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

//emailからuserレコードの取得
async function searchUser(email){
  try {
    const selectUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return selectUser.id;
  } catch (error) {
    console.error('Error selecting user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}