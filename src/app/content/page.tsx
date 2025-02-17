"use client"
import React from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import PortableTextComponents from "../../app/component/PortableTextComponents";
import Image from 'next/image';
import { useState,useEffect } from 'react';
 import Header from "../header/header" 
 import Comment from '../component/comment';


interface blogI {
  title: string;
  image: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
  content: PortableTextBlock[];
  author: string;
  date: number;
  tags?: string[];
}

const Blog =  () => {
  const [fetch1, setFetch] = useState<blogI[]>([]);
  
  const fetchData = async() => {

    const fetch = await client.fetch(`*[_type == "blog"]{
      title,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    "tags": tags[]->title,
    author,
    date
    }`);
    setFetch(fetch);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
    <div className="flex items-center justify-center bg-slate-50 ">
    <div className="flex items-center justify-center m-6 w-full gap-4">
      <div className="flex items-center justify-center">
        {fetch1.map((data: blogI, index: number) => (
          <div
            key={index}
            className=" rounded-md flex  w-full h-auto justify-center gap-4 m-1  items-center flex-col p-7"
          >
            {/* <div className='items-center'
            // onClick={
            //   () => {
            //     setBlogData('true');

            //   }
            // }
            >
            <h1 className="text-center font-bold text-4xl whitespace-nowrap relative">{data.title}</h1>
            {data.image && data.image.asset && (
              <Image
                src={urlFor(data.image.asset).width(400).height(300).url()}
                alt={data.image.alt || 'Default Alt Text'}
                width={600}
                height={300}
              />
            )}
            </div> */}
            {/* {!blogData &&( */}
            <div className="gap-5 mt-4 flex flex-col justify-center items-center  m-5 p-5 w-full">
            <h1 className="mb-[28px] font-extrabold text-4xl whitespace-nowrap relative text-center text-black">{data.title}</h1>
            {data.image && data.image.asset && (
              <Image
                src={urlFor(data.image.asset).width(400).height(300).url()}
                alt={data.image.alt || 'Default Alt Text'}
                width={600}
                height={300}
                className='items-center w-full h-[700px] rounded-md'
              />
            )}
            <div>
              <PortableText value={data.content} 
              components={PortableTextComponents}
               />
            </div>   
            </div>
            
        
          </div>
        ))}
      </div>
      
    </div>
    </div>

    <Comment/>
    </div>
  );
};

export default Blog;