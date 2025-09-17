import { AuthError } from "@auth/core/errors";

export class InvalidEmailPasswordError extends AuthError {
    static type = "Invalid credentials";
}

export class InActivedAccountError extends AuthError {
    static type = "Your account is not activated yet. Please check your email to verify your account."
}