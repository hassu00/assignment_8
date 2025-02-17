"use client";
import React from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
// import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from "@portabletext/types";
// import PortableTextComponents from "../../app/component/PortableTextComponents";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Tag {
  title: string;
  _id: string;
}

interface Author {
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

interface blogI {
  title: string;
  image: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
  content: PortableTextBlock[];
  author: Author;
  date: number;
  tags?: Tag[];
}

const Blog = () => {
  const [showUpVote, setShowUpVote] = useState(0);
  const router = useRouter();
  const [fetch1, setFetch] = useState<blogI[]>([]);

  const HandleUpVote = () => {
    setShowUpVote(prevcount => prevcount + 1);
  }
  const handleDownVote = () => {
    setShowUpVote(prevCount => Math.max(prevCount - 1, 0));
  };

  //  const handleVote = () => {
  //   setShowUpVote(prevCount => prevCount + 1); // Update the vote count when a vote is made
  // };

  const fetchData = async () => {
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
    "tags": tags[]->{ title, _id },
    "author": author->{
        name,
        image {
          asset->{
            _id,
            url
          }
        }
      },
    date
    }`);
    setFetch(fetch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" flex items-center justify-center m-6 w-full">
      <div className=" items-center ">
        {fetch1.map((data: blogI, index: number) => (
          <div
            key={index}
            className="hover:scale-[1.05] cursor-pointer w-[340px] h-[460px] rounded-xl bg-[#39393d]  gap-1 m-2 flex  flex-col p-3"
            
          >
            <div className="items-center justify-between  w-full flex flex-col" onClick={() => {
              router.push(`/content`);
            }}>
              <div className="flex gap-1 mr-[174px] pb-2">
                {data.author.image && data.author.image.asset && (
                  <Image
                    src={urlFor(data.author.image.asset)
                      .width(50)
                      .height(50)
                      .url()}
                    alt={data.author.name}
                    width={40}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <div className=" flex flex-col text-white font-semibold">
                  {data.author.name}
                  <span className="text-xs text-gray-400">
                    {new Date(data.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <h1 className="text-center font-bold text-[30px] text-white leading-[30px] whitespace-nowrap relative pb-[33px] pt-2">
                  {data.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2 text-slate-300">
                  {data.tags ? (
                    data.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                      >
                        {tag.title}
                      </span>
                    ))
                  ) : (
                    <span>No tags available</span>
                  )}
                </div>
                <div className="text-slate-300">{data.date}</div>
              </div>
              {data.image && data.image.asset && (
                <Image
                  src={urlFor(data.image.asset).width(400).height(300).url()}
                  alt={data.image.alt || "Default Alt Text"}
                  width={250}
                  height={200}
                  className="w-full h-[200px] rounded-lg mb-2"
                />
              )}



            </div>

              <div className="flex items-center justify-center gap-[70px] mb-[500px]">
                <div className="flex  bg-[#5c5c63] p-1 rounded-full mb-1">
                  <div className="flex">
                    <Image
                      src="/images/upvote.svg"
                      alt="Hero Image"
                      width={33}
                      height={33}
                      objectFit="cover"
                      className="cursor-pointer mr-3"
                      onClick={() => HandleUpVote()}
                    />
                    <p className="text-[#ffffff] text-[18px] leading-6 mr-[16px] flex justify-center items-center">
                      {" "}
                      {showUpVote}
                    </p>
                  </div>
                  <span className=" border-l-[1px] border-[#39393d] h-[27px] mt-[3px] items-center flex justify-center"></span>
                  <Image
                    src="/images/downvote.svg"
                    alt="downvote"
                    width={33}
                    height={33}
                    className="cursor-pointer ml-2"
                    onClick={() => handleDownVote()}
                  />
                </div>
                <div>
                  <Image
                    src="/images/message.svg"
                    alt="downvote"
                    width={33}
                    height={35}
                    className="cursor-pointer "
                  />
                </div>
                <div>
                  <Image
                    src="/images/bookmark.svg"
                    alt="downvote"
                    width={33}
                    height={33}
                    className="cursor-pointer"
                  />
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
