import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
    dataAbout: any[];
};

const initialState: appState = {
    dataAbout: [],
};

export const aboutStateSlice = createSlice({
    name: "aboutState",
    initialState,
    reducers: {
        setDataAbout: (state, action: PayloadAction<any[]>) => {
            state.dataAbout = action.payload;
        },
    }
});

export const {
    setDataAbout
} = aboutStateSlice.actions;

export default aboutStateSlice.reducer;