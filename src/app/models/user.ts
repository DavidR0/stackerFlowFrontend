export default class User {
    id: number;
    username: string;
    password: string;
    token: string;
    email: string;
    type: "Admin"|"User";
    banned: boolean;
    TwoFact: boolean;
    privateKey: string;
}