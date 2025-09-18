"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TSession = {
    session: Session | null
}

const UserProfile = (props: TSession) => {
    const [isOpen, setIsOpen] = useState(false);
    const username = useRef<HTMLSpanElement | null>(null);
    const { session } = props;


    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (username.current && !username.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <span ref={username} className="username" onClick={handleClick}>
                {session?.user?.name ?? session?.user?.email ?? 'User'}
            </span>
            <ul className={`dropdown__menu ${isOpen ? 'dropdown__menu--show' : 'dropdown__menu--hide'}`}>
                <li className="dropdown__item dropdown__item-1">
                    Change password
                    <Image width={15} height={15} src="icons/change-pass.svg" alt="change pass" className="dropdown__item-icon" />
                </li>
                <li
                    className="dropdown__item dropdown__item-2"
                    onClick={() => signOut()}>
                    Logout
                    <Image width={15} height={15} src="icons/logout.svg" alt="logout" className="dropdown__item-icon" />
                </li>
            </ul>
        </>
    )
}

export default UserProfile;