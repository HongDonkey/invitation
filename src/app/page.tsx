import Link from "next/link";
import { Button } from "@/components/ui/button";
 

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

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">개발 블로그</h1>
        <p className="text-2xl text-blue-600 font-semibold mb-4">
          서버 응답: {data.db}
        </p>
        <p className="text-xl text-muted-foreground mb-8">프로그래밍과 웹 개발에 대한 이야기를 나눕니다</p>
        <Button asChild>
          <Link href="/posts" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition">
            포스트 보러가기
          </Link>
        </Button>
      </section>
 
      {/* 소개 섹션 */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-secondary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">블로그 소개</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">이 블로그는 웹 개발, 프로그래밍, 그리고 최신 기술 트렌드에 대한 지식과 경험을 공유하는 공간입니다. 함께 성장하는 개발자 커뮤니티를 만들어가고자 합니다.</p>
        </div>
      </section>
    </div>
  );
};
 
export default MainPage;