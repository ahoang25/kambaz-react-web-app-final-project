import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due: string;
  available: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state: { assignments: any; }, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },

    addAssignment: (state: { assignments: any[]; }, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },

    updateAssignment: (state: { assignments: any[]; }, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    },

    deleteAssignment: (state: { assignments: any[]; }, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.assignments = state.assignments.filter((a) => a._id !== idToDelete);
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
