import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LayoutDensity = "compact" | "comfortable" | "spacious";

interface UiState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
  drawerContent: string | null;
  layoutDensity: LayoutDensity;
  commandPaletteOpen: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  drawerOpen: false,
  drawerContent: null,
  layoutDensity: "comfortable",
  commandPaletteOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    openDrawer(state, action: PayloadAction<string>) {
      state.drawerOpen = true;
      state.drawerContent = action.payload;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
      state.drawerContent = null;
    },
    setLayoutDensity(state, action: PayloadAction<LayoutDensity>) {
      state.layoutDensity = action.payload;
    },
    toggleCommandPalette(state) {
      state.commandPaletteOpen = !state.commandPaletteOpen;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  openDrawer,
  closeDrawer,
  setLayoutDensity,
  toggleCommandPalette,
} = uiSlice.actions;

export default uiSlice.reducer;
