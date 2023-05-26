import { TypedUseSelectorHook } from "react-redux";

import { useDispatch as userReduxDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector as useReduxSelector } from "react-redux/es/hooks/useSelector";
import { StoreDispatch, StoreState } from "@stores/Store";

/**
 * Use store dispatch
 */
export const useDispatch = () => userReduxDispatch<StoreDispatch>();

/**
 * Use store selector
 */
export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
