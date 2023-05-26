import { defaultAuthModel } from "@domains/auth/stores/auth/AuthModel";
import { Reducer } from "@stores/Reducer";

/**
 * Auth reducer
 */
const { update, getReducer } = new Reducer("authReducer", defaultAuthModel);

export { update as updateAuth, getReducer as authReducer };
