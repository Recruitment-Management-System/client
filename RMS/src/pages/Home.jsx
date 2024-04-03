import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <div className='bg-[#222831] text-3xl text-white text-center py-5 font-bold'>Recruitment Management System</div>
      <div className='h-full overflow-hidden'>
        <div className='h-full flex justify-center items-center gap-10'>
          <button className='cursor-pointer'>
             <Link to={"/login"} className='text-white rounded-sm text-2xl px-10 py-3 bg-[#222831]'>Login</Link>
          </button>
          <button className='cursor-pointer'>
             <Link to={"/register"} className='text-white rounded-sm text-2xl px-10 py-3 bg-[#222831]'>Register</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

