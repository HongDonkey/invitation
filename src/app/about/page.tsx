import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About</h1>

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

      <Card>
        <CardHeader>
          <CardTitle>연락처</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">문의사항이나 제안사항이 있으시면 언제든 연락 주세요.</p>
          <div className="space-y-1">
            <p>📧 Email: example@email.com</p>
            <p>💻 GitHub: github.com/username</p>
            <p>🔗 LinkedIn: linkedin.com/in/username</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;


