'use server'
import {signIn} from "@/auth";
import { InActivedAccountError, InvalidEmailPasswordError } from "./errors";

export async function authenticate(username: string, password: string) {
    try {
        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        })
        return res;
    } catch (error: unknown) {
        if (error instanceof InvalidEmailPasswordError) {
            return {
                error: InvalidEmailPasswordError.type,
                code: 1,
            }
        } else if (error instanceof InActivedAccountError) {
            return {
                error: InActivedAccountError.type,
                code: 2,
            }
        } else {
            return {
                error: 'Internal server error',
                code: 0,
            }
        }
    }
}