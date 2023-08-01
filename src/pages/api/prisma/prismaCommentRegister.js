const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドがPOST以外の場合はエラーを返す
  }

  const formData = req.body;
  // Create Comment 
  createComment(formData.post_id, formData.comment, formData.value, formData.sessionEmail).then((createdComment) => {
    console.log('Created Comment:', createdComment);
  }).catch((error) => {
    console.error('Error creating post:', error);
  });
  
  res.status(200).json({ message: 'フォームのデータを受け取りました！' });
}


// 新しいCommentを作成
async function createComment( post_id, comment_content, commentStringValue, email) {
  try {
    //Search User
    const userId = await searchUser(email);
    
    const postIntId = parseInt(post_id);
    const comment_value = parseInt(commentStringValue);
    
    //Create Comment
    const newComment = await prisma.comment.create({
      data: {
        user: { connect: { id: userId } }, 
        post: { connect: { post_id: postIntId}},
        comment_content,
        comment_value,
        //schema.prismaでpost_dateをデフォルトで設定しているのに、なぜか必須
        // comment_date: new Date(),
      },
    });

    // console.log('createComment : ' , newComment);

    return newComment;
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