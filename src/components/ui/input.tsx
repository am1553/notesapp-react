import * as React from "react";
import { cn } from "../../lib/utils.ts";
import { useStyleContext } from "../../context/StyleContext.tsx";
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const styleContext = useStyleContext();
    const theme = styleContext.theme ? styleContext.theme : "light";
    return (
      <input
        type={type}
        className={cn(
          `flex w-full rounded-lg ${theme === "light" ? "outline-neutral-300 outline focus-visible:outline-neutral-800 focus-visible:outline" : "outline-neutral-300 outline focus-visible:outline-neutral-600 focus-visible:outline"} bg-transparent px-4 py-3 text-base shadow-sm transition-colors focus disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
