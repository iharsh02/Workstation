"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function Hero() {
  const router = useRouter();
  return (
    <div className="text-center">
      <p className="text-white text-4xl md:text-6xl">Build your 1st workstation with us...</p>

      <div className="mt-5 text-white text-2xl md:text-4xl">
        <Button className="border rounded-full m-5 px-5 py-2" onClick={() => router.push("/signup")}>Get Started</Button>
      </div>
    </div>
  );
}
