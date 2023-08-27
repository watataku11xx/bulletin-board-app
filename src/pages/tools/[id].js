import PostComment  from '@components/PostComment'
import NotLoginPage  from '@components/NotLoginPage'
import { useSession } from 'next-auth/react';
import { Container, Box, Button} from '@mui/material';
import { useState } from 'react';
import DisplayComment from '@components/DisplayComment';

function Id({tool, comment, post_id}){

    const { data: session } = useSession();

    //日付をフォーマット化
    const originalDateString = tool.post.post_date;
    const date = new Date(originalDateString);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  
    return(
        <>
            {
                session && (
                    <>
                        <Container maxWidth='sm'>
                            <Box sx={{
                                border: 3,
                                borderRadius: 5,
                                padding: 2,
                            }}>
                                <h2>{tool.post.title}</h2>
                                <p>登録日: {formattedDate}</p>
                                <p>概要: {tool.post.content}</p>
                                {tool.categoryNames.map((category, index) => (
                                    <div key={index}>
                                        <span>{category}</span>
                                    </div>
                                ))}
                                <Box>
                                    <PostComment propValue={post_id}/>
                                </Box>
                                {comment.map((commentItem, index) => (
                                    <Box sx={{
                                        padding: 1,
                                        border: 2, 
                                        borderRadius: 2,
                                        margin: 1,
                                    }}>
                                        <DisplayComment commentItem={commentItem} index={index}/>                                    </Box>
                                ))}
                            </Box>
                        </Container>
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
    return {
        props:{
            tool:postData,
            comment: commentData,
            post_id: id,
        },
    }
}