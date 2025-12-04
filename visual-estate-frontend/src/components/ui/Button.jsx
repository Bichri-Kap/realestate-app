import React from "react";
import { cn } from "../../lib/utils";

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "bg-blue-600 text-white hover:bg-blue-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
