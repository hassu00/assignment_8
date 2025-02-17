import React from 'react'
import Image from 'next/image'

const header = () => {
  return (
    <div className='bg-[] border-slate-500 border-[1px] h-[100px] flex justify-center p-4 items-center gap-[50px]'>
        <div className='flex gap-6 mr-[400px]'>
        <div className='font-extrabold text-5xl text-center flex justify-center items-center text-white'>
            core
        </div>
        <div>
            <input type="text" placeholder='search' className='w-[360px] h-[60px] rounded-full text-lg p-7'/>
        </div>
        </div>
        <div>
        <Image
                    src="/images/bell.svg"
                    alt="downvote"
                    width={50}
                    height={50}
                    className="cursor-pointer ml-[200px]"
                  /> 
        </div>
        <div>
        <Image
                    src="/images/User--avatar.svg"
                    alt="downvote"
                    width={50}
                    height={50}
                    className="cursor-pointer "
                  /> 
        </div>
    </div>
  )
}

export default header