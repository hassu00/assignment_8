"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Comment {
  text: string;
  date: number;
  author: string;
  upvote:number;
}

const CommentComponent = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [commentState, setCommentState] = useState<Comment[]>([]);
  const [isClient, setIsClient] = useState(false); // Prevent SSR errors
  // const [showUpVote, setShowUpVote] = useState(0);


  const HandleUpVote = (commentIndex:number) => {
    const updatedComments = [...commentState];
    updatedComments[commentIndex].upvote += 1;
    console.log("After upvote:", updatedComments);
    setCommentState(updatedComments);
  }
  const handleDownVote = (commentIndex:number) => {
    const updatedComments = [...commentState];
    updatedComments[commentIndex].upvote = Math.max(updatedComments[commentIndex].upvote - 1, 0);
    setCommentState(updatedComments);
   };


  // Ensure this code runs only on the client side
  useEffect(() => {
    setIsClient(true);
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setCommentState(JSON.parse(savedComments));
    }
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("comments", JSON.stringify(commentState));
    }
  }, [commentState, isClient]);

  const handleAddComment = () => {
    if (text.trim() === "" || author.trim() === "") return;

    const newComment: Comment = {
      text,
      date: Date.now(),
      author,
      upvote: 0,
    };

    setCommentState((prev) => [...prev, newComment]);
    setText("");
    setAuthor("");
  };

  return (
    <div className="bg-slate-50 flex flex-col gap-6">
      <h1 className="flex justify-start pl-[140px] items-center text-blue-400 text-4xl font-extrabold">
        Comments
      </h1>
      <div className="flex gap-4 justify-center items-center p-4 text-black flex-col bg-slate-50">
        <input
          id="author"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="p-3 w-[80%] h-[65px] shadow-md text-black"
        />
        <input
          id="comment"
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="p-3 w-[80%] h-[65px] shadow-md text-black"
        />
        <button
          type="submit"
          className="bg-blue-400 p-2 w-[150px] rounded-full text-white ml-[850px] mt-[10px]"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>

<div>

      {commentState.map((comment, index) => (
        <div key={index} className="border-t-[1px] border-slate-300 w-[80%] mx-auto p-4 text-black">
          <p className="text-base font-medium">{comment.author}</p>
          <p className="text-[15px] text-slate-500">
            {new Date(comment.date).toLocaleDateString()}
          </p>
          <p className="text-[20px] leading-[33px] font-medium">{comment.text}</p>
        
                <div className="flex ml-[134px] bg-blue-400 p-1 w-[140px] rounded-full mb-1 mt-3">
                  <div className="flex">
                    <Image
                      src="/images/upvote.svg"
                      alt="Hero Image"
                      width={33}
                      height={33}
                      objectFit="cover"
                      className="cursor-pointer mr-3 ml-2"
                      onClick={() => HandleUpVote(index)}
                      />
                    <p className="text-[#ffffff] text-[18px] leading-6 mr-[16px] flex justify-center items-center">
                      {" "}
                      {comment.upvote}
                    </p>
                  </div>
                  <span className=" border-l-[1px] border-white h-[27px] mt-[3px] items-center flex justify-center"></span>
                  <Image
                    src="/images/downvote.svg"
                    alt="downvote"
                    width={33}
                    height={33}
                    className="cursor-pointer ml-2"
                    onClick={() => handleDownVote(index)}
                    />
                </div>
                </div>))}
                    </div>
    </div>
  );
};

export default CommentComponent;
