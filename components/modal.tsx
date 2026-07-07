"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  closeRef?: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const panel = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

export function Modal({ open, onClose, children, label, closeRef, className = "" }: ModalProps) {
  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const modal = e.currentTarget.querySelector<HTMLElement>(
        '[role="dialog"]'
      );
      if (!modal) return;

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  // Auto-focus close button on open
  useEffect(() => {
    if (open && closeRef?.current) {
      closeRef.current.focus();
    }
  }, [open, closeRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...backdrop}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            {...backdrop}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            {...panel}
            className={`relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl p-6 bg-[#080808] ${className}`}
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-theme-50 hover:text-theme-90 hover:bg-white/5 transition-colors z-10"
              aria-label={`Close ${label}`}
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
