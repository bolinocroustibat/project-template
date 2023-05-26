import { createSlice } from "@reduxjs/toolkit";
import {
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit/src/createSlice";

/**
 * Reducer class
 */
class Reducer<T> {
  private _slice: Slice<T, ValidateSliceCaseReducers<T, SliceCaseReducers<T>>>;

  /**
   * Reducer constructor
   * @param name
   * @param initialState
   */
  constructor(name: string, initialState: T) {
    this._slice = createSlice({
      name: name,
      initialState,
      reducers: {
        update(state, action) {
          return {
            ...state,
            ...action.payload,
          };
        },
      },
    });
  }

  /**
   * Update reducer
   * @param values
   */
  update = (values: Partial<T>) => {
    const { update } = this._slice.actions;
    return update(values);
  };

  /**
   * Get reducer
   */
  get getReducer() {
    return this._slice.reducer;
  }
}

export { Reducer };
