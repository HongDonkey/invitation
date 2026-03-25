"use client";

import { useEffect, useState } from "react";
import { X, PhoneCall } from "lucide-react";


interface WorkerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: number | null;
}

interface WorkerProfile {
  id: number;
  name: string;
  phoneNo: string;
  accountNo: string;
  snsId: string;
  bank: string;
}

export function WorkerContactModal({ isOpen, onClose, workerId }: WorkerContactModalProps) {
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || workerId === null) {
      setWorker(null);
      setError(null);
      return;
    }


    const fetchWorker = async () => {
      setLoading(true);
      setError(null);
      try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

        const response = await fetch(`${API_BASE_URL}/api/getContact/${workerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch worker data");
        }
        const data = await response.json();
        setWorker(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setWorker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [isOpen, workerId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-950 rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">오류: {error}</p>
          </div>
        )}

        {worker && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{worker.name}</h2>
            </div>

            <hr className="my-4" />

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a
                  href={`tel:${worker.phoneNo}`}
                  className="text-green-600 dark:text-green-400 hover:underline"
                >
                  {worker.phoneNo}
                </a>
              </div>

            
              <div className="flex items-center gap-3">
                <img src="/icons/account.svg"
                    className="w-5 h-5 text-blue-500 flex-shrink-0"
                    alt="account"
                />
                <a
                  href={`mailto:${worker.accountNo}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {worker.accountNo} {worker.bank}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <img src="/icons/instagram.svg"
                    className="w-5 h-5 text-blue-500 flex-shrink-0"
                    alt="account"
                />
                <a
                  href={`https://${worker.snsId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {worker.snsId}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
