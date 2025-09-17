import { AxiosError } from "axios";
import createInstanceAxios from "./axios.customize";

const axios = createInstanceAxios(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

export const loginAPI = async (username: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password })
        .catch((error: AxiosError<IBackendRes<ILogin>>) => {
            return Promise.reject(error);
        });
}

export const registerAPI = (name: string, username: string, password: string) => {
    const URL_BACKEND = `/api/v1/auth/register`;
    const data = {
        name, email: username, password
    }
    return axios.post<IBackendRes<IRegisterRes>>(URL_BACKEND, data);
}

export const verifyAccountAPI = (_id: string, code: string) => {
    const URL_BACKEND = `/api/v1/auth/verification`;
    const data = {
        _id, code
    }
    return axios.post<IBackendRes<void>>(URL_BACKEND, data);
}

export const getCodeExpired = (_id: string) => {
    const URL_BACKEND = `/api/v1/auth/code-expired`;
    return axios.post<IBackendRes<ICodeExpired>>(URL_BACKEND, { _id });
}

export const retryVerifyAPI = (email: string) => {
    const URL_BACKEND = `/api/v1/auth/retry-verification`;
    return axios.post<IBackendRes<IRetryVerification>>(URL_BACKEND, { email });
}