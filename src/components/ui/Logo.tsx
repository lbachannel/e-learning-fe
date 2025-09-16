import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/"  className="logo">
            <img src="icons/logo.svg" alt="logo" className="logo__icon" />
            <p className="logo__text">E-Learning</p>
        </Link>
    )
}

export default Logo;