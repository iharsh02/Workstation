"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Appbar() {
    const router = useRouter();
  return (
    <div className="flex text-white bg-black p-5 space-x-5">
      <button onClick={()=>signIn()}>SignIn</button>
      <button onClick={()=>signOut()}>SignOut</button>
      <button onClick={()=>router.push("/signup")}>SignUp</button>
    </div>
  );
}
