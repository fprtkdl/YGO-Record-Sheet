"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

import "../globals.css";
import "./user-login.css";

export default function UserLogin() {
  const { user, loading, login, logout } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    await login();
    router.push("/"); // 로그인 성공 후 이동할 경로
  };

  const handleLogout = async () => {
    await logout();
    router.push("/"); // 로그아웃 후 메인으로
  };

  return (
    <main>
      <div className="setUserInfo">
        <div className="textStyleCase">
          <label htmlFor="playerName">이메일</label>
          <input type="text" className="hoverFocus" id="playerName" />
        </div>

        <div className="textStyleCase">
          <label htmlFor="myDeck">비밀번호</label>
          <input type="text" className="hoverFocus" id="myDeck" />
        </div>

        <button className="submitBtn mainColorHover" id="loginBtn">
          <span>로그인</span>
        </button>
        <div className="hr-sect">
          <span>OR</span>
        </div>
        <button
          onClick={handleLogin}
          className="submitBtn mainColorHover"
          id="loginBtn"
        >
          <div className="googleIconCase">
            <Image
              src="/images/google_logo_g_logo_icon.png"
              alt="google icon"
              fill
              sizes="72px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </button>
      </div>
    </main>
  );
}
