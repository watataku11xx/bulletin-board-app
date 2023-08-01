import PostComment  from '@components/PostComment'
import NotLoginPage  from '@components/NotLoginPage'
import { useSession } from 'next-auth/react';
function Id({tool}){

  const { data: session } = useSession();
    return(
        <>
            {
                session && (
                    <>
                        <h2>{tool.title}</h2>
                        <p>{tool.content}</p>
                        <p>{tool.post_date}</p>
                        <PostComment />
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
    console.log(data);
    return {
        props:{
            tool:data,
        },
    }
}