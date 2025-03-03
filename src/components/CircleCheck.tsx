import { cn } from "@/lib/utils";

type TProps = {
  className?: string;
  showTick?: boolean;
};

export default function CircleCheck({ className, showTick }: TProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("h-5 w-5 bg-white rounded-full shadow-md", className)}
    >
      <circle cx="12" cy="12" r="10"></circle>
      {showTick && <path d="m9 12 2 2 4-4"></path>}
    </svg>
  );
}
