'use client';
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ReactNode } from "react";

const AuthComponent = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <div className="auth-layout">
            <Link href="/" className="auth-layout__back">
                <ArrowLeftOutlined />
            </Link>
            <div className="auth-layout__top">
                <h2 className="auth-layout__title">{title}</h2>
                <img src="../icons/logo.svg" alt="logo" className="auth-layout__logo" />
            </div>
            {children}
        </div>
    )
}

export default AuthComponent;