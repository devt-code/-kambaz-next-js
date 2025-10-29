import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) =>
          e.user === action.payload.user && e.course === action.payload.course
      );
      if (!exists) state.enrollments.push(action.payload);
    },
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(
            e.user === action.payload.user && e.course === action.payload.course
          )
      );
    },

    clearEnrollments: (state) => {
      state.enrollments = [];
    },
  },
});

export const { enroll, unenroll, clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
