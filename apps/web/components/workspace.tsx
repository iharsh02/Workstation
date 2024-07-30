import { Appbar } from "./appbar";
import { ReviewFootage } from "./reviewFootage";

export function Workspace() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-slate-900 to-neutral-900">
      <div className="flex ">

        <div className="flex flex-col w-1/3 m-5">
          <div className="border h-80">
            <ReviewFootage />
          </div>
          <div className="border h-80">action buttons</div>
        </div>

        <div className="border m-5 w-full">Chat section</div>
      </div>
    </div>
  );
}
