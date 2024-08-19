import { JWTPayload } from "jose";

export enum SessionType {
    Admin = "admin",
    Client = "client",
}

interface SessionPayload extends JWTPayload {
    username: string;
    type: SessionType;
    expiresAt: Date;
}

export default SessionPayload;
