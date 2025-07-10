"use client";

import {useParams} from 'next/navigation';
import {useEffect} from 'react';

export default function Page() {
  const code = useParams<{token: string}>();

  useEffect(() => {
    
  },[])


  return (
    <div>
      카카오 로그인중 입니다.
    </div>
  )
}