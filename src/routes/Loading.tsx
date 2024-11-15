import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className={"h-full w-full flex-center"}>
      <ClipLoader
        color={"#000"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        className={"mt-12"}
      />
    </div>
  );
}
