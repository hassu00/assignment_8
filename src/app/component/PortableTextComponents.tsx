import React from "react";
import Image from "next/image";
import { PortableTextComponents as PortableTextReactComponents } from "@portabletext/react";
// import { PortableTextBlock } from "@portabletext/types";

// Define TypeScript interfaces
interface ImageProps {
  value: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

interface BlockProps {
  children?: React.ReactNode;
}

const PortableTextComponents: PortableTextReactComponents = {
  types: {
    image: ({ value }: ImageProps) => (
      <Image
        src={value.asset.url}
        alt={value.alt || "Blog Image"}
        width={600} // Set width to avoid layout shift
        height={400} // Set height to avoid layout shift
        className="w-full h-auto my-4 rounded-lg"
      />
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc text-lg pl-5 space-y-2 ml-8 bg-white text-slate-500">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-5 space-y-2 ml-8 text-slate-500">{children}</ol>
    ),
    
  },
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="text-4xl font-extrabold mt-6 mb-4 text-blue-600">{children}</h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-4xl font-extrabold mt-5 mb-4 text-blue-600">{children}</h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-3xl font-bold  mt-4 mb-2 text-slate-700 ml-5">{children}</h3>
    ),
    // h4: ({ children }: BlockProps) => (
    //   <h4 className="text-2xl font-semibold  mt-4 mb-2 bg-blue-500">{children}</h4>
    // ),

    normal: ({ children }: BlockProps) => (
      <p className="text-xl font-normal  leading-relaxed mt-2 ml-4 text-slate-500">{children}</p>
    ),
  },
};

export default PortableTextComponents;
