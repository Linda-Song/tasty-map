export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/users/mypage/:path*", 
    "/stores/new/:path*",
    "/stores/:id/edit",
    "/users/likes/:path*",
  ] 
}