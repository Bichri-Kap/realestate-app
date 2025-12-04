import React from "react";
import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
}
