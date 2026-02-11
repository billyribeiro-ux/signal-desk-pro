import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  userId: string | null;
  email: string | null;
  name: string | null;
  role: "admin" | "manager" | "member" | null;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  userId: null,
  email: null,
  name: null,
  role: null,
  isAuthenticated: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<Omit<SessionState, "isAuthenticated">>,
    ) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = !!action.payload.userId;
    },
    clearSession(state) {
      state.userId = null;
      state.email = null;
      state.name = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
