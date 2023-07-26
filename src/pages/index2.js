// クライアント側で実行
export default function Index(){
  return (
    <>
      {process.env.NEXT_PUBLIC_FOO}
      {process.env.FOO}
    </>
  );
}

// サーバー側で実行
export async function getServerSideProps() {
    console.log(process.env.DB_HOST);
    return {
        props:{
            
        },
    }
}