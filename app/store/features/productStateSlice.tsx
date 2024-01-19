import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeDataProduct = {
    name: string,
    des?: string,
    url: []
}

type appState = {
    dataProduct: any[];
    dataProductProduct: TypeDataProduct[];
};

const initialState: appState = {
    dataProduct: [],
    dataProductProduct: [],
};

export const appStateSlice = createSlice({
    name: "productState",
    initialState,
    reducers: {
        setDataProduct: (state, action: PayloadAction<any[]>) => {
            state.dataProduct = action.payload;
        },
        setDataProductProduct: (state, action: PayloadAction<TypeDataProduct[]|any>) => {
            state.dataProductProduct = action.payload;
        },
    }
});

export const {
    setDataProduct,
    setDataProductProduct
} = appStateSlice.actions;

export default appStateSlice.reducer;