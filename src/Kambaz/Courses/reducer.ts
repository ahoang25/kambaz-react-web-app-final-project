import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload }) => {
      state.courses.push({
        _id: uuidv4(), 
        name: payload.name || "New Course",
        number: payload.number || "New Number",
        startDate: payload.startDate || new Date().toISOString().split("T")[0],
        endDate: payload.endDate || "",
        department : payload.department || "New Department",
        credits : payload.credits || 0,
        description: payload.description || "No description provided",
      });
    },
    deleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
    updateCourse: (state, { payload }) => {
      const index = state.courses.findIndex((c) => c._id === payload._id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...payload };
      }
    },
    setCourses: (state, { payload }) => {
      state.courses = payload; 
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
