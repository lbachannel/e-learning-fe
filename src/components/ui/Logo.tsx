import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/"  className="logo">
            <Image width={20} height={20} src="icons/logo.svg" alt="logo" className="logo__icon" />
            <p className="logo__text">E-Learning</p>
        </Link>
    )
}

export default Logo;