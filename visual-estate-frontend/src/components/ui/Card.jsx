import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4 border border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-3">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
