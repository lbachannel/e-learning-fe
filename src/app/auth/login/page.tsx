'use client';
import AuthComponent from "@/components/auth/AuthComponent";
import Link from "next/link";
import { useState } from "react";
import { authenticate } from "@/utils/actions";
import { App } from 'antd';
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import ModalResendMail from "@/components/auth/ModalResendMail";

const LoginPage = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const { notification, message } = App.useApp();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const router = useRouter();
    const [ userEmail, setUserEmail ] = useState('');

    const validateData = (username: string, password: string) => {
        let flag = true;
        if (!username) {
            setUsernameError('Email is required');
            flag = false;
        } else if (!/^\S+@\S+\.\S+$/.test(username)) {
            setUsernameError('Invalid email format');
            flag = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            flag = false;
        } else if (password.length < 10) {
            setPasswordError('Password must be at least 10 characters');
            flag = false;
        }
        return flag;
    }

    const resetErrors = () => {
        setUsernameError('');
        setPasswordError('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUserEmail('');
        const isValid = validateData(username, password);
        if (isValid) {
            setIsLoading(true);
            resetErrors();
            const response = await authenticate(username, password);
            if (response.error) {
                setIsLoading(false);
                if (response.code === 2) {
                    setIsLoading(false);
                    setIsModalOpen(true);
                    setUserEmail(username);
                    return;
                }
                notification.error({
                    message: 'Login failed',
                    description: response.error
                })

            } else {
                setIsLoading(false);
                message.success('Login successfully');
                router.push('/intro');
            }
        }
    }

    const handleSetUsername = (value: string) => {
        setUsername(value);
        if (username) {
            setUsernameError('');
        }
    }

    const handleSetPassword = (value: string) => {
        setPassword(value);
        if (password && password.length >= 10) {
            setPasswordError('');
        }
    }

    return (
        <>
            <AuthComponent title="Login">
                <form className="auth-layout__form" onSubmit={handleSubmit}>
                    <input
                        id="auth-layout__email"
                        type="email"
                        placeholder="Email address"
                        autoComplete="email"
                        className="auth-layout__email"
                        onChange={e => handleSetUsername(e.target.value)} />
                    {usernameError && <span className="auth-layout__error">{usernameError}</span>}

                    <div className="auth-layout__password-container">
                        <input
                            id="auth-layout__password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            autoComplete="password"
                            className="auth-layout__password"
                            onChange={e => handleSetPassword(e.target.value)} />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="auth-layout__eys">
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                    {passwordError && <span className="auth-layout__error">{passwordError}</span>}

                    <button type="submit" className="auth-layout__btn" disabled={isLoading}>
                        Login
                    </button>
                </form>
                <Link href="/" className="auth-layout__forgot">Forgot Password</Link>
            </AuthComponent>
            <ModalResendMail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userEmail={userEmail} />
        </>
    )
}

export default LoginPage;