export default class User {
    userId: number;
    userName: string;
    password: string;
    email: string;
    type: "Admin"|"User";
    banned: boolean;
    twoFact: boolean;
    refreshToken: string;
    accessToken: string;
    sessionId: number;
    score: number;

    constructor(user?: any) {
        if(user){
            this.userId = user.userId;
            this.userName = user.userName;
            this.password = user.password;
            this.email = user.email;
            this.type = user.type;
            this.banned = user.banned;
            this.twoFact = user.twoFact;
            this.refreshToken = user.refreshToken;
            this.accessToken = user.accessToken;
            this.sessionId = user.sessionId;
            this.score = user.score;
        }
    }
}