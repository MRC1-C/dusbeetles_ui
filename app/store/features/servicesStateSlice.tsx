import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
    dataServices: any[];
};

const initialState: appState = {
    dataServices: [],
};

export const aboutStateSlice = createSlice({
    name: "servicesState",
    initialState,
    reducers: {
        setDataServices: (state, action: PayloadAction<any[]>) => {
            state.dataServices = action.payload;
        },
    }
});

export const {
    setDataServices
} = aboutStateSlice.actions;

export default aboutStateSlice.reducer;