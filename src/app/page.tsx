"use client"

import Image from "next/image";
import TipTap from '@/app/components/Editor'
import { useState } from "react";



export default function Home() {

  const [content, setContent] = useState<string>('')
  const handleContentChange = (reason: any) => {
    setContent(reason)
  }

  return (
      <TipTap onChange={(newContent: string) => handleContentChange(newContent)} 
      content={""} 
      />
  );
}
