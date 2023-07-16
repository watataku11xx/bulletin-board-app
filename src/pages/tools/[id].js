function Id({tool}){
    return(
        <>
            <h2>{tool.name}</h2>
            
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
    console.log(data);
    return {
        props:{
            tool:data,
        },
    }
}