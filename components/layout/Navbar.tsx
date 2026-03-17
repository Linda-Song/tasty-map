'use client'

import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSession, signOut} from "next-auth/react";

export default function Navbar () {
  const [isOpen, setIsOpen] = useState(false);
  const {status} = useSession();
  
 
  return(
    <div>
      <div className="navbar">
        <Link href="/" className="navbar__logo">🥐 Tasty Map</Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">맛집목록</Link>
          <Link href="/stores/new" className="navbar__list--item">맛집등록</Link>
          <Link href="/users/likes" className="navbar__list--item">찜한가게</Link>
          <Link href="/users/mypage" className="navbar__list--item">MyPage</Link>

          {status === 'authenticated' ? 
          (<button type="button" onClick={()=> signOut()} className="navbar__list--item">
            Logout</button>) : 
          (<Link href="/api/auth/signin" className="navbar__list--item">Login</Link>)}   
        </div>

        {/* mobile version */}
        <div role="button" className="navbar__button" onClick={() => setIsOpen((val) =>!val)}>
        {isOpen ?
        <AiOutlineClose/>  : <BiMenu/> }
        </div>
      </div>
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
          <Link href="/stores" className="navbar__list--mobile-item" onClick={()=>setIsOpen(false)}>맛집목록</Link>
          <Link href="/stores/new" className="navbar__list--mobile-item" onClick={()=>setIsOpen(false)}>맛집등록</Link>
          <Link href="/users/likes" className="navbar__list--mobile-item" onClick={()=>setIsOpen(false)}>찜한가게</Link>
          <Link href="/users/mypage" className="navbar__list--mobile-item" onClick={()=>setIsOpen(false)}>MyPage</Link>
          {status === 'authenticated' ? 
          (<button type="button" onClick={()=> {signOut(); setIsOpen(false)}} className="navbar__list--mobile-item text-left w-full">
            Logout</button>) : 
          (<Link href="/api/auth/signin" className="navbar__list--mobile-item" onClick={() => setIsOpen(false)}>Login</Link>)}   
          
        </div>
        </div>
      )}
    </div>
  )
}


