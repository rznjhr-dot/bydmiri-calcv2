"use client";

import { useEffect, useCallback, useState, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  closeRef?: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

export function Modal({ open, onClose, children, label, closeRef, className = "" }: ModalProps) {
  const [render, setRender] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Mount immediately (open flipped this render), then animate in on the next frame.
    const frame = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (open) return;
    // Fade out, then unmount after the transition duration.
    const frame = requestAnimationFrame(() => setActive(false));
    const timer = setTimeout(() => setRender(false), 200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [open]);

  // Derive mount state without a synchronous setState in effect.
  const shouldRender = open || render;

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

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full max-w-lg max-h-[85dvh] overflow-y-auto rounded-2xl bg-theme-card transition-all ${
          active
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-5"
        } ${className}`}
        style={{
          transitionDuration: "var(--dur-short)",
          transitionTimingFunction: "var(--ease-out)",
          border: "1px solid var(--cz-border)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-lg text-theme-50 hover:text-theme-90 hover:bg-white/5 transition-colors z-10"
          aria-label={`Close ${label}`}
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}
