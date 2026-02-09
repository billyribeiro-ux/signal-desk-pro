import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui-slice";
import workflowReducer from "./slices/workflow-slice";
import sessionReducer from "./slices/session-slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    workflow: workflowReducer,
    session: sessionReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
