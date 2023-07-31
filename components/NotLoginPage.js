import { useSession, signIn, signOut } from 'next-auth/react';
function NotLoginPage(){
    const { data: session } = useSession();
    return(
        <>
            <div>
                <p>ログインしていません</p>
                <button onClick={() => signIn()}>ログイン</button>
            </div>
        </>
    );
}

export default NotLoginPage;