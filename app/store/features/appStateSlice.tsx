import { typeName } from "@/app/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type TypeHeader = {
  name: Array<typeName>;
  id: string;
}

type appState = {
  appState: string;
  headerState: TypeHeader[];
  currentHeader: string;
  headerProductState: TypeHeader[];
  currentHeaderProduct: string;
  language: number;
};

const initialState: appState = {
  appState: "",
  headerState: [],
  currentHeader: '',
  headerProductState: [],
  currentHeaderProduct: '',
  language: 0,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setHeaderState: (state, action: PayloadAction<TypeHeader[]>) => {
      state.headerState = action.payload;
    },
    setHeaderProductState: (state, action: PayloadAction<TypeHeader[]>) => {
      state.headerProductState = action.payload;
    },
    setCurrentHeaderState: (state, action: PayloadAction<string>) => {
      state.currentHeader = action.payload
    },
    setCurrentHeaderProductState: (state, action: PayloadAction<string>) => {
      state.currentHeaderProduct = action.payload
    },
    setLangauge: (state, action: PayloadAction<number>) => {
      state.language = action.payload
    },
    clearStateApp: (state) => {
      state.appState = ""
      state.headerState = []
      state.currentHeader = ''
      state.headerProductState = []
      state.currentHeaderProduct = ''
    },
  }
});

export const {
  setAppState,
  setHeaderState,
  setHeaderProductState,
  setCurrentHeaderState,
  setCurrentHeaderProductState,
  setLangauge,
  clearStateApp
} = appStateSlice.actions;

export default appStateSlice.reducer;