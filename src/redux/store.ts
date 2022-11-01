import { combineReducers, configureStore } from "@reduxjs/toolkit";
import twitterSlice, { ITwitterState } from "./modules/twitter/slice";

export interface IReduxState {
  twitter: ITwitterState;
}

export type AsyncThunkConfig = {
  state: IReduxState;
  rejectValue?: string;
};

const rootReducer = combineReducers({
  [twitterSlice.name]: twitterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
