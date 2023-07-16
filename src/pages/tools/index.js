import Link from "next/link"

function ToolList({tools}){
    return(
        <>
           <h1>List of Tools</h1> 
            {
                tools.map((tool) => {
                    return(
                        <div key={tool.id}>
                            <Link href={`/tools/${tool.id}`} passHref>
                                <h2>{tool.id} {tool.name}</h2>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ToolList;

export async function getServerSideProps() {
    const res = await fetch('http://localhost:4000/tools');
    const data = await res.json();

    return {
        props:{
            tools:data,
        },
    }
}