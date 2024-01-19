import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeDataProduct = {
    name: string,
    des: string,
    url: []
}

type appState = {
    dataHome: any[];
    dataProductHome: TypeDataProduct[];
};

const initialState: appState = {
    dataHome: [],
    dataProductHome: [],
};

export const appStateSlice = createSlice({
    name: "homeState",
    initialState,
    reducers: {
        setDataHome: (state, action: PayloadAction<any[]>) => {
            state.dataHome = action.payload;
        },
        setDataProductHome: (state, action: PayloadAction<TypeDataProduct[]| any>) => {
            state.dataProductHome = action.payload;
        },
    }
});

export const {
    setDataHome,
    setDataProductHome
} = appStateSlice.actions;

export default appStateSlice.reducer;