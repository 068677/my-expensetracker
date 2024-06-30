import React from 'react'


const Signupp = () => {
  return (
    <>
    <div className='flex justify-center m-10 text-center '>
    <form action="/submit.php" method="post" className='flex flex-col w-full border-2 border-black bg-blue-50 sm:w-3/4'>
        <div className='font-bold text-2xl my-2 mx-auto text-center' >
        Sign-Up
    </div>
    <div className='flex flex-col gap-2 justify-center text-left p-4'>
        <label htmlFor="emailaddress">Email Address</label>
        <input type="text" id="emailaddress" name="email-address" required  placeholder='Enter your email address' className=' bg-slate-300 w-3/4 p-2 '></input> 
    </div>
    <div className='flex flex-col gap-2 justify-center p-4 text-left'>
        <label htmlFor="createpassword">Create Password</label>
        <input type="text" id="createpassword" name="create-password" required placeholder='create a new Password' className=' bg-slate-300 w-3/4 p-2'></input> 
    </div>
    <div className='flex flex-col gap-2 justify-center p-4 text-left'>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input type="text" id="confirmpassword" name="confirm-password" required  placeholder='confirm your Password' className=' bg-slate-300 w-3/4 p-2'></input> 
    </div>
    <button className='bg-blue-500 text-white w-36 mx-auto p-2 mt-8 mb-4 rounded-md text-center'>Signup</button>

    </form>
    </div>
    </>
  )
}

export default Signupp