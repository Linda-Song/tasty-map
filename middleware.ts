import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // 로그인 페이지 경로
  },
});

export const config = { 
  matcher: [
    "/users/mypage/:path*", 
    "/stores/new/:path*",
    "/stores/:id/edit",
    "/users/likes/:path*",
  ] 
};