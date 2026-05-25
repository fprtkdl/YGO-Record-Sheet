"use client";

import { useAuth } from "@/lib/auth-context";
import "../app/globals.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !popoverRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header>
      <h1>
        <Link href="/">듀얼 전적 기록</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/input-duels-record">전적 입력</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-area">
        {loading ? (
          <span>로딩 중...</span>
        ) : user ? (
          <>
            <button
              ref={buttonRef}
              className="loginBtn mainColorHover"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {user.displayName}님
            </button>

            <div
              ref={popoverRef}
              className={`userInfoContent ${isOpen ? "onPopover" : ""}`}
            >
              <div className="userProfile">qe</div>
              <Link className="Link" href="/" onClick={() => setIsOpen(false)}>
                마이페이지
              </Link>
              <Link
                className="Link logoutBtn"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                href="/"
              >
                로그아웃
              </Link>
            </div>
          </>
        ) : (
          <Link className="loginBtn mainColorHover" href="/login">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
