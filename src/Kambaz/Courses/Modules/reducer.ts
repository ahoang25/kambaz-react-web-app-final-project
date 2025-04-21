import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Lesson {
    _id: string;
    name: string;
  }
  
  interface Module {
    _id: string;
    name: string;
    course: string;
    lessons: Lesson[];
    editing: boolean;
  }
  
  interface ModulesState {
    modules: Module[];
  }
  
  const initialState: ModulesState = {
    modules: [],  
  };
  
  const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
      setModules: (state, action: PayloadAction<Module[]>) => {
        state.modules = action.payload;
      },
  
      addModule: (state, action: PayloadAction<Module>) => {
        state.modules.push(action.payload);
      },
  
      deleteModule: (state, action: PayloadAction<string>) => {
        state.modules = state.modules.filter((m) => m._id !== action.payload);
      },
  
      updateModule: (state, action: PayloadAction<Module>) => {
        const updated = action.payload;
        state.modules = state.modules.map((m) =>
          m._id === updated._id ? updated : m
        );
      },
  
      editModule: (state, action: PayloadAction<string>) => {
        const moduleId = action.payload;
        state.modules = state.modules.map((m) =>
          m._id === moduleId ? { ...m, editing: true } : m
        );
      },
    },
  });
  
  export const {
    setModules,
    addModule,
    deleteModule,
    updateModule,
    editModule,
  } = modulesSlice.actions;
  
  export default modulesSlice.reducer;
