import PostComment from "../../../components/PostComment";
function Id({tool}){
    return(
        <>
            <h2>{tool.name}</h2>
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
            })}
            <PostComment />
        </>
    );
}

export default Id;

export async function getServerSideProps(context) {
    const { params } = context;
    const res = await fetch(
        `http://localhost:4000/tools/${params.id}`
    )
    const data = await res.json();
    return {
        props:{
            tool:data,
        },
    }
}