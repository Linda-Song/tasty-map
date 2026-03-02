import { PrismaClient } from "@prisma/client";

// 전역 변수에 prisma 인스턴스를 저장하기 위한 타입 정의
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// 개발 환경에서는 global 객체에 저장된 인스턴스를 재사용하고, 
// 프로덕션에서는 새 인스턴스를 생성합니다.
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;