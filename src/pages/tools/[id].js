import PostComment  from '@components/PostComment'
import NotLoginPage  from '@components/NotLoginPage'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
function Id({tool, comment, post_id}){

  const { data: session } = useSession();
  
    return(
        <>
            {
                session && (
                    <>
                        <h2>{tool.title}</h2>
                        <p>{tool.content}</p>
                        <p>{tool.post_date}</p>
                        <PostComment propValue={post_id}/>
                        {comment.map((commentItem, index) => (
                            <div key={index}>
                                <p>Comment {index + 1} Value: {commentItem.comment_value}</p>
                                <p>Comment {index + 1} Content: {commentItem.comment_content}</p>
                            </div>
                        ))}
                    </>
                )
            }
            {
                !session && (
                    <>
                        <NotLoginPage />
                    </>
                ) 
            }
            
        </>
    );
}

export default Id;

export async function getServerSideProps(context) {
    const { id } = context.query;
    //fetch post data
    const postRes = await fetch(`http://localhost:3000/api/prisma/prismaToolDisplay?id=${id}`)
    const postData = await postRes.json();

    //fetch comment data
    const commentRes = await fetch(`http://localhost:3000/api/prisma/prismaCommentDisplay?id=${id}`)
    const commentData = await commentRes.json();
    console.log(commentData);
    return {
        props:{
            tool:postData,
            comment: commentData,
            post_id: id,
        },
    }
}