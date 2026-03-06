/* eslint-disable @next/next/no-img-element */
'use client'; // 1. 클라이언트 컴포넌트 선언

import { useSession, signOut } from "next-auth/react";



export default function MyPage() {
  const { data: session, status } = useSession(); // 2. return 밖에서 호출

  // 로딩 중일 때 표시
  if (status === "loading") {
    return <div className="md:max-w-5xl mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  // 로그인이 안 되어 있을 때
  if (status === "unauthenticated") {
    return (
      <div className="md:max-w-5xl mx-auto px-4 py-8 text-center">
        로그인이 필요한 페이지입니다.
      </div>
    );
  }

  return (
    <div className="md:max-w-5xl mx-auto px-4 py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Page</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and account settings.</p>
      </div>

      {session?.user && (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {/* 1. 이름 */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session.user.name || "N/A"}
              </dd>
            </div>

            {/* 2. 이메일 */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session.user.email}
              </dd>
            </div>

            {/* 3. 프로필 이미지 */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Profile Image</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                
                <img
                src={session.user.image || "/images/pie.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover outline-2"
                onError={(e) => {
                  e.currentTarget.src = "/images/markers/pie.png"; // 로딩 실패 시 기본 이미지로 교체
                }}
              />
             
              </dd>
            </div>

            {/* 4. 로그아웃 버튼 */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Account Action</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })} // 로그아웃 후 홈으로 이동
                  className="text-sm hover:text-red-600 transition-colors"
                >
                  Log out
                </button>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}