import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import path from "path";

// Prisma가 prisma.config.ts의 설정을 따르도록 기본 생성자를 사용합니다.
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 시딩 시작...");

  // JSON 데이터 경로 확인
  const dataPath = path.join(process.cwd(), "data/store_data.json");
  const fileData = fs.readFileSync(dataPath, "utf-8");
  const stores = JSON.parse(fileData);

  console.log(`📦 총 ${stores.length}개의 데이터를 처리합니다.`);

  for (const store of stores) {
    // result 변수를 사용하지 않아 노란 줄이 뜬다면, 변수 선언을 생략하고 await만 사용합니다.
    await prisma.store.upsert({
      where: { id: store.id },
      update: {},
      create: {
        id: store.id,
        title: store.title,
        address: store.address,
        lat: store.lat, // 숫자로 확실히 변환
        lng: store.lng, // 숫자로 확실히 변환
        category: store.category,
        phone: store.phone,
      },
    });
  }

  console.log("✨ 시딩 완료!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ 시딩 중 에러 발생:", e);
    await prisma.$disconnect();
    process.exit(1);
  });