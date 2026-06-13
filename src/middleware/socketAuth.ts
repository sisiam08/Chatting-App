import { Socket } from "socket.io";
import cookie from "cookie";
import { auth } from "../lib/auth";
import createAppError from "../errors/appError";
import status from "http-status";

export const socketAuth = async (socket: Socket, next: any) => {
  try {
    const handshakeCookies = socket.handshake.headers.cookie;

    if (!handshakeCookies) {
      createAppError("No cookies found in handshake", status.BAD_REQUEST);
      return;
    }

    const parsedCookies = cookie.parse(handshakeCookies);

    const sessionToken = parsedCookies["better-auth.session_token"];

    if (!sessionToken) {
      createAppError("No session token found in cookies", status.BAD_REQUEST);
      return;
    }

    const session = await auth.api.getSession({
      headers: {
        cookie: `better-auth.session_token=${sessionToken}`,
      },
    });

    if (!session || !session.user) {
      createAppError("Invalid session", status.UNAUTHORIZED);
      return;
    }

    socket.data.user = session.user;

    next();
  } catch (error) {
    return next(new Error("Socket authentication failed"));
  }
};
