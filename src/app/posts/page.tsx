import { PostsList } from "@/components/posts/posts-list";

type GuestBookEntry = {
  seq: number;
  name: string;
  insDate: string;
  contents: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function fetchGuestBookEntries(): Promise<GuestBookEntry[]> {
  const res = await fetch(`${API_BASE_URL}/api/getGuestbook`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("방명록 데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
}

export default async function PostsPage() {
  const entries = await fetchGuestBookEntries();

  return <PostsList initialEntries={entries} />;
}