import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import { UserType } from "../schemas/auth.schema";

export const signJwt = (
  payload: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      "base64"
    ).toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};

export const signTokens = async (userId: number, userType: UserType) => {
  const access_token = signJwt(
    { sub: userId, userType },
    "accessTokenPrivateKey",
    {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    }
  );

  const refresh_token = signJwt(
    { sub: userId, userType },
    "refreshTokenPrivateKey",
    {
      expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
    }
  );

  return { access_token, refresh_token };
};
