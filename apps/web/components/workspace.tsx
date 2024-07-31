"use client"; 

import { useEffect, useState } from 'react';
import axios from 'axios';

interface SignedUrl {
  key: string;
  url: string;
}

export default function Workspace() {
  const [signedUrls, setSignedUrls] = useState<SignedUrl[]>([]);

  useEffect(() => {
    async function fetchSignedUrls() {
      try {
        const response = await axios.get<{ signedUrls: SignedUrl[] }>('http://localhost:3001/api/v1/workstation');
        setSignedUrls(response.data.signedUrls);
      } catch (error) {
        console.error('Error fetching signed URLs:', error);
      }
    }

    fetchSignedUrls();
  }, []);

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-slate-900 to-neutral-900">
      <h1 className="text-2xl font-bold mb-4 w-1/2 m-auto mt-5">Uploads</h1>
      <ul className='w-1/2 m-auto'>
        {signedUrls.map((item, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{item.key}</h2>
            <video controls className="">
              <source src={item.url} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}
