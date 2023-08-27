function DisplayComment({commentItem, index}) {

    return (
        <>
            <div key={index}>
                <p>評価: {commentItem.comment_value}</p>
                <p>コメント: {commentItem.comment_content}</p>
            </div>
        </>
    )

}

export default DisplayComment;