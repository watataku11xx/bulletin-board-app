import Link from "next/link"

function ToolList({tools}){
    console.log(tools);
    return(
        <>
           <h1>List of Tools</h1> 
            {
                tools.map((toolItem) => (
                    <div key={toolItem.post_id}>
                        {/* 下記のコードを変更 */}
                        <Link key={toolItem.post_id}  href="/tools/[id]" as={`/tools/${toolItem.post_id}`}>
                            {toolItem.post_id}
                            {toolItem.title}
                        </Link>
                    </div>
                ))
            }
            <Link href={'./toolRegister'}>新しいツールを投稿する</Link>
        </>
    )
}

export default ToolList;

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/prisma/prismaToolListDisplay`);
    const data = await res.json();
    return {
        props: {
            tools: data
        },
    }
}