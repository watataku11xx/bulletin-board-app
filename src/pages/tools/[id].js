import PostComment  from '@components/PostComment'
import NotLoginPage  from '@components/NotLoginPage'
import { useSession } from 'next-auth/react';
function Id({tool, post_id}){

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
    const res = await fetch(`http://localhost:3000/api/prisma/prismaToolDisplay?id=${id}`)
    const data = await res.json();
    return {
        props:{
            tool:data,
            post_id: id,
        },
    }
}