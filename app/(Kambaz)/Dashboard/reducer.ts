/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload }) => {
      const alreadyEnrolled = state.enrollments.some(
        (enrollment: any) =>
          enrollment.user === payload.user &&
          enrollment.course === payload.course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push(payload);
      }
    },
    unenrollUser: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(
            enrollment.user === payload.user &&
            enrollment.course === payload.course
          )
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
