import PostComment from "../../../components/PostComment";
import { useSession, signIn, signOut } from 'next-auth/react';
function Id({tool}){

  const { data: session } = useSession();
    return(
        <>
            {/* <h2>{tool.name}</h2>
            <h3>description</h3>
            <p>{tool.description}</p>
            {tool.comments.map((comment) => {
                return(
                    <>
                        <div>
                            id:{comment.id} review:{comment.review}
                        </div>
                        <div>
                            {comment.comment}
                        </div>
                    </>
                )
            })} */}
            {
                session && (
                    <PostComment />
                )
            }
            {
                !session && (
                    <div>
                        <p>ログインでコメント投稿出来ます。</p>
                    </div>
                ) 
            }
            
        </>
    );
}

export default Id;

export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3000/api/prisma/prisma');
    const data = await res.json();
    console.log(data);
    return {
        props: {data},
    }
}