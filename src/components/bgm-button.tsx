"use client";

import { useState, useRef, useEffect } from "react";
import { VolumeX, Volume1, Volume2 } from "lucide-react";

export function BgmButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0); // 기본값 0 (뮤트)
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 오디오 요소 설정
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = volume;
    }
  }, []);

  // 음량 변경 후 오디오 요소에 반영
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        // 재생 중이면 일시정지
        audio.pause();
        setIsPlaying(false);
      } else {
        // 일시정지 상태면 재생
        // play() 호출 시 자동으로 권한 요청
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("오디오 재생 오류:", error);
      // autoplay policy 등의 이유로 재생 실패 시
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // 음량을 0이 아닌 값으로 변경하면 자동 재생 시도
    if (!isPlaying && newVolume > 0) {
      handlePlayPause();
    }
  };

  // 음량에 따라 아이콘 선택
  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) {
      return <VolumeX className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
    if (volume < 0.5) {
      return <Volume1 className="w-5 h-5 text-blue-500" />;
    }
    return <Volume2 className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src="/bgm/Sparkle.mp3"
        preload="metadata"
      />
      <button
        onClick={() => setShowVolumeControl(!showVolumeControl)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="음악 볼륨 조절"
        title="음악 볼륨 조절"
      >
        {getVolumeIcon()}
      </button>

      {/* 볼륨 컨트롤 드롭다운 */}
      {showVolumeControl && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-32 z-50">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              음량: {Math.round(volume * 100)}%
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  volume * 100
                }%, #d1d5db ${volume * 100}%, #d1d5db 100%)`
              }}
            />
            <div className="flex gap-2 justify-between">
              <button
                onClick={handlePlayPause}
                className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex-1"
              >
                {isPlaying ? "중지" : "재생"}
              </button>
              <button
                onClick={() => setShowVolumeControl(false)}
                className="text-xs px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded transition-colors flex-1"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
