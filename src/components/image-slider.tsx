"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
  images: string[]
}

export default function ImageSlider({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <div className="flex flex-col items-center">
    <div className="flex items-center justify-center gap-4">

      
      {/* 좌우 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
      >
        ◀
      </button>

        <div className="overflow-hidden max-w-[500px]" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div className="min-w-full flex justify-center" key={i}>
              <Image
                src={src}
                alt=""
                width={800}
                height={600}
                className="max-h-[60vh] object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>



      <button
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
      {/* 사진 번호 */}
      <div className="text-center mt-3 text-sm">
        {index + 1} / {images.length}
      </div>

    </div>
  )
}