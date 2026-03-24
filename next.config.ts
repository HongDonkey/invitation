import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed proxy rewrite to avoid ECONNREFUSED errors when backend is not running.
  // The internal Next.js API routes should handle `/api/...` directly.
  // 모달 클릭 시에 백엔드가 켜져있지 않으면 ECONNREFUSED 에러가 발생하는 문제를 방지하기 위해 rewrites 설정 제거.
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8080/api/:path*",
  //     },
  //   ];
  // }
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
