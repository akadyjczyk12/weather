export interface User {
    fname: string;
    lname: string;
    city: string;
    country: string;
    email: string;
    password: string;
}

export interface Info<T> {
    isLogged: boolean;
    role?: string;
    user: T;
}
