import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { IoChevronDown } from "react-icons/io5";

export function Select({ options = [], value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex justify-between items-center rounded-md border border-gray-300 px-3 py-2 text-sm bg-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        )}
      >
        <span>{value || placeholder || "Select"}</span>
        <IoChevronDown className="text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md z-20 max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
