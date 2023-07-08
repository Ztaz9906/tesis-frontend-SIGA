import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAbastecimiento: false,
  showCajero: false,
  showFacturacion: false,
  showDistribucion: false,
  showReservacion: false,
  showConfiguracion: false,
  activeTab: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      if (state.activeTab === action.payload) {
        state.showAbastecimiento = false;
        state.showCajero = false;
        state.showFacturacion = false;
        state.showDistribucion = false;
        state.showReservacion = false;
        state.showConfiguracion = false;
        state.activeTab = null;
      } else {
        state.showAbastecimiento = false;
        state.showCajero = false;
        state.showFacturacion = false;
        state.showDistribucion = false;
        state.showReservacion = false;
        state.showConfiguracion = false;
        state[`show${action.payload}`] = true;
        state.activeTab = action.payload;
      }
    },
  },
});

export const {
  setActiveTab,
} = globalSlice.actions;

export default globalSlice.reducer;
