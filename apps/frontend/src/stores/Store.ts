import {
  AnyAction,
  combineReducers,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { defaultAuthModel } from "@domains/auth/stores/auth/AuthModel";
import { authReducer } from "@domains/auth/stores/auth/AuthReducer";

/**
 * Reducer
 * Add all reducer here
 */
const reducer = combineReducers({ authReducer });

/**
 * Store config
 */
const storeConfig: StoreModel = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    authReducer: defaultAuthModel,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

/**
 * Store state type
 */
type StoreState = ReturnType<typeof reducer>;

/**
 * Store dispatch type
 */
type StoreDispatch = ThunkDispatch<StoreState, void, AnyAction>;

/**
 * Store model type
 */
type StoreModel = Store<StoreState> & {
  dispatch: StoreDispatch;
};

/**
 * Store thunk type
 */
type StoreThunk = ThunkAction<void, StoreState, void, AnyAction>;

export { storeConfig };
export type { StoreState, StoreDispatch, StoreModel, StoreThunk };
