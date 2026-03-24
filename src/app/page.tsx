import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageGrid } from "@/components/image-grid";
 

async function getHelloData() {
  try {
    // next.config.js에 rewrites 설정을 했다면 '/api/hello'만 써도 됩니다.
    // 설정 전이라면 전체 주소를 적어주세요.
    const res = await fetch('http://localhost:8080/api/db-check', { 
      cache: 'no-store' // 매번 새로운 데이터를 가져오도록 설정
    });
    
    if (!res.ok) return { message: "데이터를 불러오지 못했습니다." };
    return res.json();
  } catch (error) {
    return { message: "서버가 꺼져있거나 연결할 수 없습니다." };
  }
}

const MainPage =  async () => {

  const data = await getHelloData();

  // 이미지 파일 목록
  const images = [
    "/images/660227a7700df97e0d480fa8_Vectors-Wrapper.svg",
    "/images/660260d723227235a20f5527_talenx_01.png",
    "/images/66026668469cbfb12b9fc1c0_n2.png",
    "/images/660267d3cf9d83a421aa3bfd_mm2.png",
    "/images/660272f0ae091b9dc159cd40_Frame 427318457.png",
    "/images/660278968055fa6d7782465.png",
    "/images/68ef67ee5b89543667739e0d_web home-성과관리 kr-p-2600.png",
    "/images/68ef67ee72022ce7f77649c0_web home-평가관리 kr-p-2600.png",
    "/images/697c0df6d44a5839be38f2a0_1.png",
    "/images/test1/66026668469cbfb12b9fc1c0_n2.png",
    "/images/test1/660267d3cf9d83a421aa3bfd_mm2.png",
    "/images/test1/660272f0ae091b9dc159cd40_Frame 427318457.png",
    "/images/test1/660278968055fa6d7782465.png",
    "/images/test1/68ef67ee5b89543667739e0d_web home-성과관리 kr-p-2600.png",
    "/images/test1/68ef67ee72022ce7f77649c0_web home-평가관리 kr-p-2600.png",
    "/images/test1/697c0df6d44a5839be38f2a0_1.png",
  ];

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
 
      {/* 소개 섹션 */}
      {/* <section className="container mx-auto px-4 py-12">
        <div className="bg-secondary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">블로그 소개</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">이 블로그는 웹 개발, 프로그래밍, 그리고 최신 기술 트렌드에 대한 지식과 경험을 공유하는 공간입니다. 함께 성장하는 개발자 커뮤니티를 만들어가고자 합니다.</p>
        </div>
      </section> */}
    </div>
  );
};
 
export default MainPage;