// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   count: 0,
// };
// const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       console.log("Before increment:", state.count);
//       state.count += 1;
//       console.log("After increment:", state.count);
//     },
//     decrement: (state) => {
//       state.count -= 1;
//     },
//   },
// });
// export const { increment, decrement } = counterSlice.actions;
// export default counterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
