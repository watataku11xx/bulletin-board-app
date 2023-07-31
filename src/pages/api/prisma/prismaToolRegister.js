const { PrismaClient } = require('@prisma/client');

// PrismaClientのインスタンスを作成します
const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドがPOST以外の場合はエラーを返す
  }

  const formData = req.body; // リクエストボディからフォームのデータを取得
//   console.log('server side recieve data: ', formData)
    console.log(formData);
    // createPost('userIdHere', 'タイトル', 'コンテンツ').then((createdPost) => {
    //   console.log('Created Post:', createdPost);
    // }).catch((error) => {
    //   console.error('Error creating post:', error);
    // });
  res.status(200).json({ message: 'フォームのデータを受け取りました！' });
}


// 新しいPostを作成します
async function createPost(userId, title, content) {
  try {
    // Prismaのcreateメソッドを使用してPostを作成します
    const newPost = await prisma.post.create({
      data: {
        user: { connect: { id: userId } }, // userIdに対応するUserを関連付けます
        title,
        content,
      },
    });

    // 作成されたPostを返します
    return newPost;
  } catch (error) {
    // エラー処理
    console.error('Error creating post:', error);
    throw error;
  } finally {
    // Prisma Clientの接続を解放します
    await prisma.$disconnect();
  }
}

// 新しいPostを作成します