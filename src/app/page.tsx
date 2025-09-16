import Link from "next/link";

const AppPage = () => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__left">
        <img src="icons/logo.svg" alt="logo" className="splash-screen__left-logo" />
        <h1 className="splash-screen__left-title">E-Learning</h1>
        <p>Welcome to the application</p>
      </div>

      <div className="splash-screen__right">
        <Link href="/auth/register" className="splash-screen__right-register">
            Register
        </Link>
        <Link href="/auth/login" className="splash-screen__right-login">
            Login
        </Link>
      </div>
    </div>
  )
}

export default AppPage;