import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { InActivedAccountError, InvalidEmailPasswordError } from "./utils/errors";
import { loginAPI } from "./services/api";
import { IUser } from "./types/next-auth";
import { AxiosError } from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await loginAPI(credentials.username as string, credentials.password as string);
                    return {
                        _id: response?.data?.data?.user._id,
                        name: response?.data?.data?.user.name,
                        email: response?.data?.data?.user.email,
                        access_token: response?.data?.data?.access_token,
                    };
                } catch (error) {
                    if (error instanceof AxiosError) {
                        const backendRes = error.response?.data as IBackendRes<ILogin>;
                        if (backendRes && +backendRes.statusCode === 401) {
                            throw new InvalidEmailPasswordError();
                        } else if (backendRes && +backendRes.statusCode === 400) {
                            throw new InActivedAccountError();
                        } else {
                            throw new Error("Internal server error");
                        }
                    } else {
                        throw new Error("Network error or internal server error");
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = (user as IUser);
            }
            return token;
        },
        session({ session, token }) {
            (session.user as IUser) = token.user;
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        }
    }
});