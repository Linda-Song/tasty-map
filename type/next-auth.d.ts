import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string;
      email: string;
      image?: string;
    }
  }
   interface User {
    id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub : string | number;
  }
}
 