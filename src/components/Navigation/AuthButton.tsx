import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()
  async function handleGoogleSignIn(){
    signIn()


  }
  if (session) {
    return (
      <>
      {session.user && (
          <div> Signed in as {session.user.name}</div>  
      )}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => console.log(session)}>Sign 123</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={handleGoogleSignIn}>Sign in</button>
    </>
  )
}