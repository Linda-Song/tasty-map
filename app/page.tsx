import Link from "next/link";

export default function Home() {
  return (
   <div>
    <h1>Home</h1>
    <ul>
      <li><Link href="stores">맛집목록</Link></li>
      <li><Link href="stores/new">맛집생성</Link></li>
      <li><Link href="stores/1/edit">맛집상세페이지</Link></li>
      <li><Link href="users/login">로그인</Link></li>
      <li><Link href="users/mypage">마이페이지</Link></li>
      <li><Link href="users/likes">찜한맛집</Link></li>
      
      
    </ul>
   </div>
    
  );
}
