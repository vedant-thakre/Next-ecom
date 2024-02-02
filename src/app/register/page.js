"use client"
import React from 'react'

const isRegistered = true;

const Register = () => {
  return (
    <div className='bg-white relative'>
        <div className='flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row' >
            <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row' >
                <div className='w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
                    <div className='flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10'>
                        <p className='w-full text-4xl text-center font-serif font-medium'>
                          { isRegistered ? "Registration Successfull !" : "Sign up for an account" }  
                        </p>
                        {
                            isRegistered ? 
                            <button className='inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg
                             text-white font-medium transition-all duration-200 ease-in-out focus:shadow uppercase tracking-wide' >
                                Login
                            </button> 
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;