import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

import { Cookie } from "../graphql";
import { Cookies } from "./cookies.schema";

const generateEncryptionKey = async (
  domain: string,
  orgId: string,
  email: string,
) => {
  const encryptionPassword = `${domain}-${orgId}-${email}-${process.env.COOKIE_ENCRYPTION_KEY}`;
  return (await promisify(scrypt)(encryptionPassword, "salt", 32)) as Buffer;
};

export const encryptCookies = async (
  cookies: Cookie[],
  domain: string,
  orgId: string,
  email: string,
): Promise<[Buffer, string]> => {
  // The key length is dependent on the algorithm.
  // In this case for aes256, it is 32 bytes.
  const key = await generateEncryptionKey(domain, orgId, email);
  const iv = randomBytes(16);
  const cipher = createCipheriv(
    process.env.COOKIE_ENCRYPTION_ALGORITHM,
    key,
    iv,
  );

  const cookiesSerialized = JSON.stringify(cookies);
  return [
    Buffer.concat([cipher.update(cookiesSerialized), cipher.final()]),
    iv.toString("base64"),
  ];
};

export const decryptCookies = async (
  cookieCollection: Cookies,
): Promise<Cookie[]> => {
  const { domain, orgId, email, iv, cookies } = cookieCollection;
  const key = await generateEncryptionKey(domain, orgId, email);
  const decipher = createDecipheriv(
    process.env.COOKIE_ENCRYPTION_ALGORITHM,
    key,
    Buffer.from(iv, "base64"),
  );
  const decryptedCookies = Buffer.concat([
    decipher.update(cookies),
    decipher.final(),
  ]);
  return JSON.parse(decryptedCookies.toString()) as Cookie[];
};
