// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Enrollment {
//   user: string;
//   course: string;
// }

// interface EnrollmentsState {
//   enrollments: Enrollment[];
// }

// const initialState: EnrollmentsState = {
//   enrollments: [],
// };

// const enrollmentsSlice = createSlice({
//   name: "enrollments",
//   initialState,
//   reducers: {
//     enroll: (state, action: PayloadAction<Enrollment>) => {
//       const exists = state.enrollments.some(
//         (e) =>
//           e.user === action.payload.user && e.course === action.payload.course
//       );
//       if (!exists) state.enrollments.push(action.payload);
//     },
//     unenroll: (state, action: PayloadAction<Enrollment>) => {
//       state.enrollments = state.enrollments.filter(
//         (e) =>
//           !(
//             e.user === action.payload.user && e.course === action.payload.course
//           )
//       );
//     },

//     setEnrollments: (state, { payload }) => {
//       state.enrollments = payload;
//     },

//     clearEnrollments: (state) => {
//       state.enrollments = [];
//     },
//   },
// });

// export const { enroll, unenroll, setEnrollments, clearEnrollments } =
//   enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;

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
