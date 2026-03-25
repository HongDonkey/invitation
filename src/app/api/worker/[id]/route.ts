import { NextResponse } from "next/server";

const workerData = [
  { id: 1, name: "작업자1", email: "example1@email.com", github: "github.com/user1", phone: "010-0001-0001", role: "프론트엔드 개발자" },
  { id: 2, name: "작업자2", email: "example2@email.com", github: "github.com/user2", phone: "010-0002-0002", role: "백엔드 개발자" },
  { id: 3, name: "작업자3", email: "example3@email.com", github: "github.com/user3", phone: "010-0003-0003", role: "풀스택 개발자" },
  { id: 4, name: "작업자4", email: "example4@email.com", github: "github.com/user4", phone: "010-0004-0004", role: "디자이너" },
  { id: 5, name: "작업자5", email: "example5@email.com", github: "github.com/user5", phone: "010-0005-0005", role: "데브옵스" },
  { id: 6, name: "작업자6", email: "example6@email.com", github: "github.com/user6", phone: "010-0006-0006", role: "QA 엔지니어" },
];

interface Worker {
  id: number;
  name: string;
  email: string;
  github: string;
  phone: string;
  role: string;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (Number.isNaN(id) || id < 1) {
    return NextResponse.json({ error: "Invalid worker id" }, { status: 400 });
  }

  const worker = workerData.find((item) => item.id === id);

  if (!worker) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  return NextResponse.json(worker);
}
