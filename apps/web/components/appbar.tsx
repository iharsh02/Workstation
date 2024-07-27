"use client";
import { signIn, signOut } from "next-auth/react";

export function Appbar() {
  return (
    <div className="flex text-white bg-black p-5 space-x-5">
      <button onClick={()=>signIn()}>SignIn</button>
      <button onClick={()=>signOut()}>SignOut</button>
    </div>
  );
}
