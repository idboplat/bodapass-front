"use client"

import {useEffect} from 'react';

export default function Page() {

  useEffect(() => {
    fetch('/api/auth/signout', {
      method: 'POST',
      credentials: "include",
    }).then(() => {
      window.location.href = '/';
    });
  }, []);
  return null;
}