import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database"; 

interface Enrollment {
  user: string;    
  course: string;  
}

// The shape of our enrollments slice
interface EnrollmentsState {
  enrollments: Enrollment[];
}

interface EnrollmentPayload {
  userId: string;
  courseId: string;
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments || [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },

    enrollUser: (state, action: PayloadAction<EnrollmentPayload>) => {
      const { userId, courseId } = action.payload;
      const alreadyEnrolled = state.enrollments.some(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
      );
      if (!alreadyEnrolled) {
        state.enrollments.push({ user: userId, course: courseId });
      }
    },

    unenrollUser: (state, action: PayloadAction<EnrollmentPayload>) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
      );
    },

    toggleEnrollment: (state, action: PayloadAction<EnrollmentPayload>) => {
      const { userId, courseId } = action.payload;
      const index = state.enrollments.findIndex(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
      );
      if (index >= 0) {
        state.enrollments.splice(index, 1);
      } else {
        state.enrollments.push({ user: userId, course: courseId });
      }
    },
  },
});

export const {
  setEnrollments,
  enrollUser,
  unenrollUser,
  toggleEnrollment,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
