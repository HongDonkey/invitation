"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageGridProps {
  images: string[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          closeModal();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown, { capture: true });
      // 모달이 열릴 때 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  return (
    <>
      {/* 이미지 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => openModal(index)}
          >
            <Image
              src={image}
              alt={`이미지 ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* 이미지 모달 */}
      {selectedImageIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-8">
    
    {/* 모달 박스 */}
    <div className="relative w-full max-w-3xl max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col">
      
      {/* 닫기 버튼 */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 z-10 text-black hover:text-gray-600"
      >
        ✕
      </button>

      {/* 이미지 영역 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-full h-[60vh]">
          <Image
            src={images[selectedImageIndex]}
            alt={`이미지 ${selectedImageIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 좌우 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-black bg-white/80 p-2 rounded-full shadow"
      >
        ◀
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-black bg-white/80 p-2 rounded-full shadow"
      >
        ▶
      </button>

      {/* 카운터 */}
      <div className="pb-4 text-center text-sm text-gray-600">
        {selectedImageIndex + 1} / {images.length}
      </div>
    </div>
  </div>
)}
    </>
  );
}