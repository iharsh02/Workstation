import { Appbar } from "./appbar";
import { Section } from "./section";

export function Workspace() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-slate-900 to-neutral-900">
      <Appbar />
      <div className="border w-5/6 m-auto">
        <Section>hello this is section </Section>
      </div>
    </div>
  );
}
