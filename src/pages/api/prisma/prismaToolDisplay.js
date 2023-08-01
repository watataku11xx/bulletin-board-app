const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドがPOST以外の場合はエラーを返す
  }

  const formData = req.body;  
  // Create post
  createPost(formData.toolName, formData.toolOverView, formData.sessionEmail).then((createdPost) => {
    console.log('Created Post:', createdPost);
  }).catch((error) => {
    console.error('Error creating post:', error);
  });
  
  res.status(200).json({ message: 'フォームのデータを受け取りました！' });
}