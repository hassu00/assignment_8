import React from 'react'
import Blog from './blog/blog'
import Header from "./header/header";
// import Comment from './component/comment';


const Page = () => {
  return (
    <div className=''>
      <Header/>
      <Blog />
      {/* <Comment /> */}

    </div>
  )
}

export default Page