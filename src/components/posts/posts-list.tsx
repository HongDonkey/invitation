"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { CreatePostModal } from "@/components/posts/create-post-modal";

type GuestBookEntry = {
  seq: number;
  name: string;
  insDate: string;
  contents: string;
};

interface PostsListProps {
  initialEntries: GuestBookEntry[];
}

export function PostsList({ initialEntries }: PostsListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState(initialEntries);
  const [editingEntry, setEditingEntry] = useState<GuestBookEntry | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [entryToDelete, setEntryToDelete] = useState<GuestBookEntry | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handlePostSuccess = useCallback(() => {
    window.location.reload();
  }, []);

  const handlePostClick = (entry: GuestBookEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    entry: GuestBookEntry
  ) => {
    e.stopPropagation();
    setEntryToDelete(entry);
    setDeletePassword("");
    setDeleteError(null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

      const response = await fetch(
        `${API_BASE_URL}/api/deleteGuestbook`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pwd: deletePassword,
            seq: entryToDelete.seq,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      setIsDeleteModalOpen(false);
      setEntryToDelete(null);
      setDeletePassword("");
      window.location.reload();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "삭제에 실패했습니다."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.insDate).getTime() - new Date(a.insDate).getTime()
  );

  return (
    <div className="container mx-auto py-8 px-3 max-w-2xl pt-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">360 피드백</h1>
          <p className="text-muted-foreground">피드백현황</p>
        </div>
        <Button
          onClick={handleCreateNew}
          className="flex gap-2 hover:text-blue-500 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          작성
        </Button>
      </div>

      <div className="space-y-6">
        {sortedEntries.length > 0 ? (
          sortedEntries.map((entry) => (
            <Card
              key={entry.seq}
              onClick={() => handlePostClick(entry)}
              className="hover:border-blue-300 transition-colors hover:shadow-md cursor-pointer relative"
            >
              <button
                onClick={(e) => handleDeleteClick(e, entry)}
                className="absolute top-4 right-4 z-10 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                aria-label="Delete post"
              >
                <X className="w-5 h-5" />
              </button>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {entry.name || "익명"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.insDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{entry.contents}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              아직 게시물이 없습니다. 첫 번째 피드백을 작성해보세요!
            </p>
          </div>
        )}
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingEntry={editingEntry}
        onSuccess={handlePostSuccess}
      />

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white dark:bg-slate-950 rounded-lg shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">게시물을 삭제하시겠습니까?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              삭제된 게시물은 복구할 수 없습니다. 비밀번호를 입력해주세요.
            </p>

            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="비밀번호 입력"
              disabled={isDeleting}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />

            {deleteError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm mb-4">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1"
              >
                닫기
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={isDeleting || !deletePassword}
                className="flex-1"
              >
                {isDeleting ? "삭제 중..." : "삭제하기"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
