function ToolList({tools}){
    return(
        <>
           <h1>List of Tools</h1> 
            {
                tools.map((tool) => {
                    return(
                        <div>
                                <h2>{tool.title}</h2>
                            <hr/>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ToolList;

export async function getStaticProps() {
    const res = await fetch('http://localhost:4000/tools');
    const data = await res.json();

    return {
        props:{
            tools:data,
        },
    }
}