import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageGrid } from "@/components/image-grid";
 
// 백엔드 연결 확인용 API
// async function getHelloData() {
//   try {
//     // next.config.js에 rewrites 설정을 했다면 '/api/hello'만 써도 됩니다.
//     // 설정 전이라면 전체 주소를 적어주세요.
//     const res = await fetch('http://localhost:8080/api/db-check', { 
//       cache: 'no-store' // 매번 새로운 데이터를 가져오도록 설정
//     });
    
//     if (!res.ok) return { message: "데이터를 불러오지 못했습니다." };
//     return res.json();
//   } catch (error) {
//     return { message: "서버가 꺼져있거나 연결할 수 없습니다." };
//   }
// }

// ✅ 이미지 가져오는 함수 추가
async function getImages() {
  try {
    const res = await fetch("http://localhost:3000/api/images", {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

const MainPage =  async () => {

  // const data = await getHelloData();
   const images = await getImages();

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        {/* <h1 className="text-5xl font-bold mb-4">Next.js + Spring + Liquibase</h1> */}
        <h1 className="text-5xl font-bold mb-4"></h1>
        {/* <p className="text-2xl text-blue-600 font-semibold mb-4">
          서버 응답: {data.db}
        </p>
        <p className="text-xl text-muted-foreground mb-8">LOCAL TEST</p> */}
        <Button asChild>
          <Link href="/posts" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition">
            포스트 보러가기
          </Link>
        </Button>
      </section>

      {/* 이미지 갤러리 */}
      <section className="container mx-auto px-4 pb-20">
        <ImageGrid images={images} />
      </section>

    </div>
  );
};
 
export default MainPage;