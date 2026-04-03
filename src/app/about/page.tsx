"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KakaoMap from "@/components/kakaoMap";
import { WorkerContactModal } from "@/components/worker-contact-modal";
import { BookUser } from "lucide-react";

interface NameData {
  seq: number;
  name: string;
}

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [names, setNames] = useState<NameData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (id: number) => {
    setSelectedWorkerId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkerId(null);
  };

  const fetchName = async () => {
    try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

      const response = await fetch(`${API_BASE_URL}/api/getName`);
      if (!response.ok) {
        throw new Error("Failed to fetch name data");
      }
      const data = await response.json();
      setNames(data);
      console.log(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNames([]);
    } 
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div className="container mx-auto py-8 px-3 max-w-4xl pt-20">
      <h1 className="text-3xl font-bold mb-2 text-center">결혼식</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>블로그 소개</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">이 블로그는 Next.js 14와 TypeScript를 활용하여 만든 개인 기술 블로그입니다. 웹 개발과 프로그래밍에 대한 경험과 지식을 공유하며, 함께 성장하는 개발자 커뮤니티를 만들어가고자 합니다.</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary rounded-md">Next.js 14</span>
            <span className="px-3 py-1 bg-secondary rounded-md">TypeScript</span>
            <span className="px-3 py-1 bg-secondary rounded-md">Tailwind CSS</span>
            <span className="px-3 py-1 bg-secondary rounded-md">MDX</span>
            <span className="px-3 py-1 bg-secondary rounded-md">React</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>연락처</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">이름 우측의 아이콘을 눌러 연락처를 확인해주세요.</p>
          {/* <div className="space-y-1 grid grid-cols-2 gap-4">
              <button
                key={1}
                onClick={() => handleOpenModal(1)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                  <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
              <button
                key={2}
                onClick={() => handleOpenModal(2)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                  <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
              <button
                key={3}
                onClick={() => handleOpenModal(3)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                 <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
              <button
                key={4}
                onClick={() => handleOpenModal(4)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                  <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
              <button
                key={5}
                onClick={() => handleOpenModal(5)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                  <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
              <button
                key={6}
                onClick={() => handleOpenModal(6)}
                className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">작업자</p>
                  </div>
                  <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </button>
          </div> */}
          <div className="space-y-1 grid grid-cols-2 gap-4">
          {names.map((name) => (
            <button
              key={name.seq}
              onClick={() => handleOpenModal(name.seq)}
              className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{name.name}</p>
                </div>
                <BookUser className="w-5 h-5 text-blue-500 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>오시는 길</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
             위치를 확인해주세요.
          </p>

          <KakaoMap />

        <div className="mt-6 text-sm text-gray-700 space-y-6">
          {/* 주소 */}
          <div className="text-base font-medium">
            📍 경기 안산시 단원구 광덕1로 171
          </div>

          {/* 지하철 */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 bg-pink-300 inline-block"></span>
              🚉 지하철
            </div>
            <div className="mt-2 space-y-1 text-gray-600">
              <p>4호선 고잔역 2번 출구</p>
              <p>셔틀버스는 예식 2시간 후까지 운행합니다.</p>
              <p>(셔틀버스 5~7분 간격 수시운행 / 도보 15~20분)</p>
            </div>
          </div>

          {/* 버스 */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 bg-orange-300 inline-block"></span>
              🚌 버스
            </div>
            <div className="mt-2 space-y-1 text-gray-600">
              <p>안산 문화숲의 광장 하차 : 88</p>
              <p>동남레이크빌 하차 : 99-1, 3100</p>
              <p>대림호수공원아파트 하차 : 77, 98, 3</p>
            </div>
          </div>

          {/* 자가용 */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 bg-gray-400 inline-block"></span>
              🚗 자가용
            </div>
            <div className="mt-2 space-y-1 text-gray-600">
              <p>서울방향 - 안산JC - 안산IC - 법원검찰청 - AW컨벤션</p>
              <p>수원방향 - 수인산업도로 - 법원검찰청 - AW컨벤션</p>
              <p>인천방향 - 서안산IC - 법원검찰청 - AW컨벤션</p>
              <p>영동고속도로 - 안산IC - 법원검찰청 - AW컨벤션</p>
              <p>서해안고속도로 - 매송IC - 해안로(호수공원) - 시청방향 - AW컨벤션</p>
            </div>
          </div>

          {/* 주차장 */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 bg-green-400 inline-block"></span>
              🅿️ 주차장
            </div>
            <div className="mt-2 space-y-1 text-gray-600">
              <p>제1주차장 : AW컨벤션 지상, 지하 1층, 2층</p>
              <p>제2주차장 : 양지주차타워 (AW컨벤션주차타워)</p>
              <p>제3주차장 : AW컨벤션 정문 맞은편 공영주차장</p>
              <p>제4주차장 : MK주차타워</p>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>


      <WorkerContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        workerId={selectedWorkerId}
      />
    </div>
  );
};

export default AboutPage;


