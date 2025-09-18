'use client';

import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AppPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="splash-screen">
      {isLoading &&
        <div className="spinner-overlay">
          <Spin />
        </div>
      }
      <div className="splash-screen__left">
        <Image width={77} height={51} src="icons/logo.svg" alt="logo" className="splash-screen__left-logo" />
        <h1 className="splash-screen__left-title">E-Learning</h1>
        <p>Welcome to the application</p>
      </div>

      <div className="splash-screen__right">
        <Link
          href="/auth/register"
          className="splash-screen__right-register"
          onClick={() => setIsLoading(true)}>
          Register
        </Link>
        <Link
          href="/auth/login"
          className="splash-screen__right-login"
          onClick={() => setIsLoading(true)}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default AppPage;