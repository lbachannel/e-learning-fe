'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SidebarLayout = () => {
    const pathname = usePathname();
    const listRef = useRef<HTMLUListElement | null>(null);
    const [lineStyle, setLineStyle] = useState<{ transform: string; height: number, transition: string }>({
        transform: `translateY(${0}px)`,
        height: 0,
        transition: 'none'
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!listRef.current) return;
        const activeItem = listRef.current.querySelector<HTMLLIElement>(
            `.sidebar__item-link[href="${pathname}"]`
        )?.parentElement as HTMLLIElement | null;

        if (activeItem) {
            setLineStyle({
                transform: `translateY(${activeItem.offsetTop}px)`,
                height: activeItem.offsetHeight,
                transition: mounted ? 'transform 0.25s ease, height 0.25s' : 'none'
            });
        }
    }, [pathname]);


    return (
        <div className="sidebar">
            <ul ref={listRef} className="sidebar__list">
                <li className={`sidebar__item ${pathname === "/intro" ? "sidebar__item--active" : ""}`}>
                    <Link href="/intro" className="sidebar__item-link" data-link>
                        <span>
                            <img src="icons/home.svg" alt="" className="sidebar__item-link-icon" />
                        </span>
                        Intro
                    </Link>
                </li>

                <li className={`sidebar__item ${pathname === "/about" ? "sidebar__item--active" : ""}`}>
                    <Link href="/about" className="sidebar__item-link" data-link>
                        <span>
                            <img src="icons/book.svg" alt="" className="sidebar__item-link-icon" />
                        </span>
                        About
                    </Link>
                </li>

                <li className={`sidebar__item ${pathname === "/contact" ? "sidebar__item--active" : ""}`}>
                    <Link href="/contact" className="sidebar__item-link" data-link>
                        <span>
                            <img src="icons/contact.svg" alt="" className="sidebar__item-link-icon" />
                        </span>
                        Contact
                    </Link>
                </li>
            </ul>
            <div
                className="sidebar__active-line"
                style={{ 
                    transform: lineStyle.transform, 
                    height: lineStyle.height, 
                    transition: lineStyle.transition
                }}></div>
        </div>
    )
}

export default SidebarLayout;