// app/page.tsx
import HomeClient from "@/components/home/HomeClient";
import { prisma } from "@/lib/prismadb"; // 직접 prisma 인스턴스 호출

export default async function Home() {
  // axios/fetch 대신 서버에서 직접 DB 데이터를 가져옵니다.
  const stores = await prisma.store.findMany();
const response = {
  data: JSON.parse(JSON.stringify(stores)), // 배열을 data 속성에 넣어야 함
  totalCount: stores.length,
  totalPages: 1,
  page: 1
};
return <HomeClient stores={response} />;
}