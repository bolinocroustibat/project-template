import { authConfig } from "@domains/auth/AuthConfig";
import { getCookie } from "@utils/CookiesUtil";

/**
 * Auth model
 */
type AuthModel = {
  token: TokenModel;
  user?: UserModel;
};

/**
 * Token model
 */
type TokenModel = {
  type?: string;
  access?: string;
  // refresh: string;
  // expiresAt is UTC format
  // expiresAt: string;
};

/**
 * Update model
 */
type UserModel = {
  id: number;
  email: string;
  username: string;
};

/**
 * Default auth model
 * @ref AuthService.ts
 */
const tokenJSON = JSON.parse(getCookie(authConfig.store.tokenKey) || "{}");
const defaultAuthModel: AuthModel = {
  token: {
    type: tokenJSON["type"],
    access: tokenJSON["access"],
  },
  user: undefined,
};

export { defaultAuthModel };
export type { AuthModel, UserModel, TokenModel };
