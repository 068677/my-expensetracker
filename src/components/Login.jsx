import React from 'react'
import Signupp from './Signupp'

const Login = () => {
  return (
    <>
    <div className='flex justify-between items-center p-8 '>
    <img src="https://www.go.ooo/img/bg-img/Login.jpg" className='w-1/3 hidden pb-[30px] md:block '></img>
    <form action="/submit.php" method="post" className='flex flex-col w-full pb-[30px] rounded bg-blue-50 md:w-2/3'>
    <div className='font-bold text-2xl my-2 mx-auto' >
        Login
    </div>
    <div className='flex flex-col gap-2 justify-center p-4'>
        <label htmlFor="emailaddress">Email Address</label>
        <input type="text" id="emailaddress" name="loginemailaddress" placeholder='Enter your email address' required className=' bg-slate-300 w-3/4 p-2 '></input> 
    </div>
    <div className='flex flex-col gap-2 justify-center p-4'>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="loginpassword" required placeholder='Enter your Password' className=' bg-slate-300 w-3/4 p-2'></input> 
    </div>
    <button className='bg-blue-500 text-white w-36 mx-auto p-2 mt-8 mb-4 rounded-md'>Login</button>
    <p className='text-center'>Don't have an account? <a href="/Signupp" className='font-bold '> signup</a></p>


        
    </form>
    </div>
  
    </>
  )
}

export default Login