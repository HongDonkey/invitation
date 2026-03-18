import { Card, CardContent, CardHeader } from "@/components/ui/card";

type GuestBookEntry = {
  seq: number;
  name: string;
  insDate: string;
  contents: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function fetchGuestBookEntries(): Promise<GuestBookEntry[]> {
  const res = await fetch(`${API_BASE_URL}/api/guestbook`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("방명록 데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
}

export default async function PostsPage() {
  const entries = await fetchGuestBookEntries();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.insDate).getTime() - new Date(a.insDate).getTime(),
  );

  return (
    <div className="container mx-auto py-8 px-3 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">💌 방명록</h1>
      <p className="text-muted-foreground mb-8">저희의 결혼식에 축하 메시지를 남겨주세요!</p>

      <div className="space-y-4">
        {sortedEntries.map((entry) => (
          <Card
            key={entry.seq}
            className="hover:border-blue-300 transition-colors hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{entry.name || "익명"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(entry.insDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{entry.contents}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}