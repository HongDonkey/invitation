"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type GuestBookEntry = {
  seq: number;
  name: string;
  insDate: string;
  contents: string;
};

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editingEntry?: GuestBookEntry | null;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSuccess,
  editingEntry,
}: CreatePostModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    pwd: "",
    contents: "",
  });

  const isEditMode = !!editingEntry?.seq;

  const handleClose = () => {
    setError(null);
    setFormData({ name: "", pwd: "", contents: "" });
    onClose();
  };

  useEffect(() => {
    if (isOpen && editingEntry) {
      setFormData({
        name: editingEntry.name,
        pwd: "",
        contents: editingEntry.contents,
      });
    } else if (isOpen) {
      setFormData({ name: "", pwd: "", contents: "" });
    }
  }, [isOpen, editingEntry]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

      // 수정 모드일 때 비밀번호 검증
      if (isEditMode && editingEntry) {
        const verifyResponse = await fetch(
          `${API_BASE_URL}/api/verifyGuestbookPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              seq: editingEntry.seq,
              pwd: formData.pwd,
            }),
          }
        );

        if (!verifyResponse.ok) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/saveGuestbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seq: isEditMode ? editingEntry.seq : undefined,
          name: formData.name || "익명",
          contents: formData.contents,
          pwd: formData.pwd,
        }),
      });

      if (!response.ok) {
        throw new Error(
          isEditMode ? "게시물 수정에 실패했습니다." : "게시물 작성에 실패했습니다."
        );
      }

      onSuccess?.();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pt-8">
          <h2 className="text-2xl font-bold mb-6">
            {isEditMode ? "게시물 수정" : "게시물 작성"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                이름 <span className="text-muted-foreground">(선택사항)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="익명으로 남기실 수 있습니다"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="contents" className="block text-sm font-medium mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contents"
                name="contents"
                value={formData.contents}
                onChange={handleChange}
                placeholder="게시물 내용을 입력해주세요"
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label htmlFor="pwd" className="block text-sm font-medium mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                placeholder="삭제 또는 수정할 경우 사용됩니다"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading
                  ? isEditMode
                    ? "수정 중..."
                    : "작성 중..."
                  : isEditMode
                    ? "수정하기"
                    : "작성하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
