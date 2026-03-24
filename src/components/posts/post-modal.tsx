"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PostModal({ isOpen, onClose, children }: PostModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* scroll container adjusts to content height up to max-h */}
        <div className="overflow-y-auto px-8 pb-8" style={{ maxHeight: 'calc(96vh - 48px)' }}>
          <div className="prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
