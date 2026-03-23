import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

function FilterDropdown({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected = options.find((o) => o.value === value)?.label || label;

  return (
    <div ref={dropdownRef} className="relative w-[160px]">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
        w-full
        flex justify-between items-center
        px-4 py-3
        text-sm tracking-wider
        border-b border-gray-300
        hover:border-black
        transition-colors
        cursor-pointer
        "
      >
        {selected}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* DROPDOWN */}
      <AnimatePresence mode="popLayout">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
            absolute
            left-0
            top-full
            mt-2
            w-full
            bg-white
            border
            shadow-lg
            z-20
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="
                block
                w-full
                text-left
                px-4 py-3
                text-sm
                hover:bg-gray-100
                transition-colors
                cursor-pointer
                "
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterDropdown;
