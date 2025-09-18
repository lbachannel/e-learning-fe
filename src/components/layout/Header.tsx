'use client';
import { Session } from "next-auth";
import DarkLightMode from "../ui/DarkLightMode";
import Fullscreen from "../ui/FullScreen";
import Logo from "../ui/Logo";
import SearchForm from "../ui/Search";
import UserProfile from "../ui/UserProfile";

const HeaderLayout = ({ session }: { session: Session | null }) => {

    return (
        <header className="header">
            <Logo />
            <div className="header__menu">
                <div className="header__search">
                    <SearchForm />
                </div>
                <div className="header__settings">
                    <ul className="header__settings-list">
                        <li className="header__settings-list-item">
                            <Fullscreen />
                        </li>
                        <li className="header__settings-list-item">
                            <DarkLightMode />
                        </li>
                        <li className="header__settings-list-item dropdown">
                            <UserProfile session={session} />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default HeaderLayout;