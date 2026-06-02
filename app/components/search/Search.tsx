"use client";

import { Search, X } from "lucide-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  debounceTime?: number;
}

export function SearchBar({
  value = "",
  onChange,
  placeholder = "Search Products by name...",
  className,
  inputClassName,
  debounceTime = 500,
}: SearchBarProps) {
  const [hasValue, setHasValue] = useState(Boolean(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (nextValue: string) => {
    setHasValue(Boolean(nextValue));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(nextValue);
    }, debounceTime);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setHasValue(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onChange("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={clsx("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 size-5 text-muted-foreground pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={clsx(
            "w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm",
            "placeholder:text-muted-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
            inputClassName
          )}
        />

        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className={clsx(
              "cursor-pointer absolute right-3 flex items-center justify-center",
              "rounded hover:bg-secondary/50 p-1 transition-colors"
            )}
            aria-label="Clear search"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
