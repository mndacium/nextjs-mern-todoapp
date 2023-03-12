import { signIn } from 'next-auth/react';
import { useState } from 'react';

// This goes to our signup API endpoint
async function createUser(username:string, password:string) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

// This gets handled by the [...nextauth] endpoint
function AuthForm() {
  const [registered, setRegistered] = useState<boolean>(false)
  const [usernameInput,setUsernameInput] = useState<string>("");
  const [passwordInput,setPasswordInput] = useState<string>("");

  return (
    <>
<input className='text-black' type="text" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}/>
<input className='text-black' type="text" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}/>
    <button onClick={()=>{
          signIn('credentials', {
            username: usernameInput,
            password: passwordInput,
          })
          console.log({
            username: usernameInput,
            password: passwordInput,
          })
        }}>login</button>
    </>
  )
}

export default AuthForm;