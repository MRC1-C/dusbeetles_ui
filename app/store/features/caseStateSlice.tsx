import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeDataProduct = {
    name: string,
    des: string,
    url: []
}

type appState = {
    dataCase: any[];
    dataProductCase: TypeDataProduct[];
};

const initialState: appState = {
    dataCase: [],
    dataProductCase: [],
};

export const appStateSlice = createSlice({
    name: "caseState",
    initialState,
    reducers: {
        setDataCase: (state, action: PayloadAction<any[]>) => {
            state.dataCase = action.payload;
        },
        setDataProductCase: (state, action: PayloadAction<TypeDataProduct[]| any>) => {
            state.dataProductCase = action.payload;
        },
    }
});

export const {
    setDataCase,
    setDataProductCase
} = appStateSlice.actions;

export default appStateSlice.reducer;