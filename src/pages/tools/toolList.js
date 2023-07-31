import Link from "next/link"

function ToolList({tools}){
    return(
        <>
           <h1>List of Tools</h1> 
            {/* {
                tools.map((tool) => {
                    return(
                        <div key={tool.id}>
                            <Link href={`/tools/${tool.id}`} passHref>
                                <h2>{tool.id} {tool.name}</h2>
                            </Link>
                        </div>
                    )
                })
            } */}
            <Link href={"./toolRegister"}>新しいツールを投稿する</Link>
        </>
    )
}

export default ToolList;

export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3000/api/prisma/prisma');
    const data = await res.json();
    console.log(data);
    return {
        props: {data},
    }
}