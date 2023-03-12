import AuthForm from '@/components/AuthForm';
import { Inter } from '@next/font/google';
import { useSession } from "next-auth/react";
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const { data: session } = useSession()
    
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for NextJsTodoApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        
        <AuthForm></AuthForm>
      </main>
    </>
  )
}
