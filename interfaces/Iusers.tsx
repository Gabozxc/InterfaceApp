export interface IcreateUser {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface IcreateUserConfirmation {
    name: string,
    email: string,
    updated_at: string,
    created_at: string,
    id: string
}

export interface ILoginUser {
    email: string,
    password: string,
}

export interface ILoginUserConfirmation {
    user: User;
    token: string;
}


interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
}
