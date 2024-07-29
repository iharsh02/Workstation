import { Appbar } from "./appbar";
import { Hero } from "./Hero";

export function Landing() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-neutral-900 min-h-screen">
      <Appbar />
      <div className="mt-[10rem]">
        <Hero />
      </div>
    </div>
  );
}
